import React from "react";
import { orderBy } from "lodash";
import CommentsList, { CommentForm } from "../common/comments";
import { useComments } from "../../hooks/use-comments";

const Comments = () => {
  const { createComment, comments, removeComment } = useComments();

  const handleSubmit = (data) => {
    createComment(data);
    // api.comments
    //   .add({ ...data, pageId: userId })
    //   .then((data) => setComments([...comments, data]));
  };

  const handleRemoveComment = (id) => {
    removeComment(id);
    // api.comments.remove(id).then((id) => {
    //   setComments(comments.filter((comment) => comment._id !== id));
    // });
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
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
