import React from "react";
import { createBrowserHistory } from "history";
import { Router } from "react-router";
import RootRoutes from "./RootRoutes";
import { NavBar } from "../components/layout/navbar/navbar";
import { Body } from "../components/layout/body/body";
import { AuthContextProvider } from "../contexts/AuthContext";

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <AuthContextProvider>
        <NavBar />

        <Body>
          <RootRoutes />
        </Body>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
