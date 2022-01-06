import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useAuth } from "./use-auth";
// import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { userId } = useParams();
  // const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  // const [error, setError] = useState(null);

  useEffect(() => {
    setComments(null);
  }, []);

  async function createComment(data) {
    const comment = {
      id: nanoid(),
      ...data,
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    };

    console.log(comment);
  }

  return (
    <CommentsContext.Provider value={{ comments, createComment }}>
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
