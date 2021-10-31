import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../pages/user-list-page";
import UserPage from "../pages/user-page";

const Users = () => {
  const params = useParams();
  const { userId } = params;

  return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
};

export default Users;
