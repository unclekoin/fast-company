import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/ui/navbar";
import Main from "./layouts/main";
import LogIn from "./layouts/login";
import LogOut from "./layouts/logout";
import Users from "./layouts/users";
import { AuthProvider } from "./hooks/use-auth";
import ProtectedRoute from "./components/common/protected-route";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";
import { loadUsersList } from "./store/users";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsersList());
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
  }, []);

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/login/:type?" component={LogIn} />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
