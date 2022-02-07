import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash";
import { nanoid } from "nanoid";
import CommentsList, { CommentForm } from "../common/comments";
import {
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  createComment,
  removeComment
} from "../../store/comments";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
  const { userId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());

  const handleSubmit = ({ content }) => {
    const data = {
      content,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId
    };
    dispatch(createComment(data));
  };

  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body ">
          <CommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Комментарии</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              <h3>Loading...</h3>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
