import React from "react";
import PropTypes from "prop-types";
import Comments from "../../ui/comments";
import UserCard from "../../ui/user-card";
import QualitiesCard from "../../ui/qualities-card";
import MeetingsCard from "../../ui/meetings-card";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId));

  if (user) {
    return (
      <div className="container pt-5">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={ user }/>
            <QualitiesCard data={ user.qualities }/>
            <MeetingsCard value={ user.completedMeetings }/>
          </div>
          <div className="col-md-8">
            <Comments/>
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
