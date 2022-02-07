import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const currentUserId = useSelector(getCurrentUserId());
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getComments();
  }, [userId]);

  async function createComment(data) {
    const comment = {
      _id: nanoid(),
      ...data,
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [content, ...prevState]);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments((prevState) => prevState.filter((comment) => comment._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, []);

  return (
    <CommentsContext.Provider value={{ comments, createComment, isLoading, removeComment }}>
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
