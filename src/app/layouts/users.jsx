import React from "react";
import { useParams } from "react-router-dom";
import UsersList from "../components/users-list";
import UserPage from "../components/user-page";

const UsersPage = () => {
  const params = useParams();
  const { userId } = params;

  return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
};

export default UsersPage;
