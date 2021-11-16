import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../../components/ui/qualities";
import CommentForm from "../../ui/comments/comment-form";
import Comments from "../../ui/comments/comments";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.users.getById(userId).then((data) => setUser(data));
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const deleteComment = (id) => {
    api.comments.remove(id);
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  };

  const handleClick = () => {
    history.push(history.location.pathname + "/edit");
  };

  if (user) {
    return (
      <div className="container pt-5">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card mb-3">
              <div className="card-body">
                <button
                  onClick={handleClick}
                  className="position-absolute top-0 end-0 btn btn-light btn-sm bg-transparent border-0"
                >
                  <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                  <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                      Math.random() + 1
                    )
                      .toString(36)
                      .substring(7)}.svg`}
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{user.name}</h4>
                    <p className="text-secondary mb-1">
                      {user.profession.name}
                    </p>
                    <div className="text-muted">
                      <i
                        className=" bi bi-caret-down-fill text-primary"
                        role="button"
                      />
                      <i
                        className="bi bi-caret-up text-secondary"
                        role="button"
                      />
                      <span className="ms-2">{user.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Качества</span>
                </h5>
                <p className="card-text">
                  <Qualities qualities={user.qualities} />
                </p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Завершенные встречи</span>
                </h5>
                <h1 className="display-1">{user.completedMeetings}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <CommentForm />
            {users && comments ? (
              <Comments
                comments={comments}
                users={users}
                onDelete={deleteComment}
              />
            ) : (
              <h3>Loading...</h3>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <h2>Loading...</h2>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
