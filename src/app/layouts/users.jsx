import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import UsersListPage from "../components/pages/user-list-page";
import UserPage from "../components/pages/user-page";
import EditUserPage from "../components/pages/user-edit-page/edit-user-page";
import UsersLoader from "../components/ui/hoc/users-loader";
import { getCurrentUserId } from "../store/users";

const Users = () => {
  const { userId, edit } = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      <UsersLoader>
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <EditUserPage />
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  );
};

export default Users;
