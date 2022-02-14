import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/ui/navbar";
import Main from "./layouts/main";
import LogIn from "./layouts/login";
import LogOut from "./layouts/logout";
import Users from "./layouts/users";
import ProtectedRoute from "./components/common/protected-route";
import AppLoader from "./components/ui/hoc/app-loader";

const App = () => {
  return (
    <>
      <AppLoader>
        <Navbar/>
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={ Users }/>
          <Route path="/login/:type?" component={ LogIn }/>
          <Route path="/logout" component={ LogOut }/>
          <Route path="/" exact component={ Main }/>
          <Redirect to="/"/>
        </Switch>
      </AppLoader>
      <ToastContainer/>
    </>
  );
};

export default App;
