import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/ui/navbar";
import Main from "./layouts/main";
import LogIn from "./layouts/login";
import LogOut from "./layouts/logout";
import Users from "./layouts/users";
import { ProfessionProvider } from "./hooks/use-profession";
import { AuthProvider } from "./hooks/use-auth";
import ProtectedRoute from "./components/common/protected-route";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  return (
    <>
      <AuthProvider>
        <Navbar />
        <ProfessionProvider>
          <Switch>
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={LogIn} />
            <Route path="/logout" component={LogOut} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
