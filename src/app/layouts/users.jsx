import React, { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UsersListPage from "../components/pages/user-list-page";
import UserPage from "../components/pages/user-page";
import EditUserPage from "../components/pages/user-edit-page/edit-user-page";
import UsersProvider from "../hooks/use-users";
import { useAuth } from "../hooks/use-auth";
import { getDataStatus, loadUsersList } from "../store/users";

const Users = () => {
  const { userId, edit } = useParams();
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const dataStatus = useSelector(getDataStatus());

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, []);

  console.log(dataStatus);

  if (!dataStatus) return <h3>Loading...</h3>;

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
