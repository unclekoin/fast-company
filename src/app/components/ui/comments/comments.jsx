import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../../utils/display-date";
import Comment from "./comment";

const Comments = ({ comments, users, onDelete }) => {
  const getAuthorName = (id) => {
    return users.find((user) => user._id === id).name;
  };

  if (!comments.length) return null;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Комментарии</h2>
        <hr />
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            id={comment._id}
            content={comment.content}
            author={getAuthorName(comment.userId)}
            date={displayDate(comment.created_at)}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
  users: PropTypes.array,
  onDelete: PropTypes.func
};

export default Comments;
