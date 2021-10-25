import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/navbar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="col-lg-8 mx-auto p-3 py-md-5 d-flex">
        <Switch>
          <Route path="/users/:userId?" component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
};

export default App;
