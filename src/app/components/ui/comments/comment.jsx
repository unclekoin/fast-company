import React from "react";
import PropTypes from "prop-types";

const Comment = ({ id, content, author, date, onDelete }) => {
  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
              )
                .toString(36)
                .substring(7)}.svg`}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    <span>{author}</span>
                    <span className="mx-2">|</span>
                    <span className="small">{date}</span>
                  </p>
                  <button onClick={() => onDelete(id)} className="btn btn-sm text-primary d-flex align-items-center">
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  onDelete: PropTypes.func
};

export default Comment;
