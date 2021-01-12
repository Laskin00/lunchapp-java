import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { SignIn } from "../screens/SignIn/sign-in";
import { SignUp } from "../screens/SignUp/sign-up";

const RootRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <Switch>
          <Redirect from="/signup" to="/" />
          <Redirect from="/signin" to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />

          <Redirect to="/signin" />
        </Switch>
      )}
    </>
  );
};

export default RootRoutes;
