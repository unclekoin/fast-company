import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/pages/user-list-page";
import UserPage from "../components/pages/user-page";
import EditUserPage from "../components/pages/user-edit-page/edit-user-page";

const Users = () => {
  const { userId, edit } = useParams();

  return (
    <>
      {userId ? (
        edit ? (
          <EditUserPage />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
