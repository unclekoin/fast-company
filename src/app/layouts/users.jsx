import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UsersListPage from "../components/pages/user-list-page";
import UserPage from "../components/pages/user-page";
import EditUserPage from "../components/pages/user-edit-page/edit-user-page";
import UsersProvider from "../hooks/use-users";
import { useAuth } from "../hooks/use-auth";

const Users = () => {
  const { userId, edit } = useParams();
  const { currentUser } = useAuth();

  return (
    <>
      <UsersProvider>
        {userId ? (
          edit ? (
            userId === currentUser._id ? (
              <EditUserPage />
            ) : (
              <Redirect to={`/users/${currentUser._id}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersProvider>
    </>
  );
};

export default Users;
