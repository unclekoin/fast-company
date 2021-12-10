import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/ui/navbar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ProfessionProvider } from "./hooks/use-profession";
import { QualitiesProvider } from "./hooks/use-qualities";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Switch>
          <Route path="/" exact component={Main} />
          <QualitiesProvider>
            <ProfessionProvider>
              <Route path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
            </ProfessionProvider>
          </QualitiesProvider>
          <Redirect to="/" />
        </Switch>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
