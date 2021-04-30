import React from "react";
import { Switch, Redirect, BrowserRouter } from "react-router-dom";
import Router from "./core/Router";
import SimpleRouter from "./core/Router/SimpleRouter";

import { Main as MainLayout } from "./core/Layouts";
import Dashboard from "views/Dashboard";

import SignIn from "views/SignIn";
import SignUp from "views/SignUp";

import NotFound from "views/NotFound";
import Help from "views/Help";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Router
          privateRoute
          component={Dashboard}
          exact
          layout={MainLayout}
          layoutTitle="Dashboard"
          path="/"
        />

        <Router
          privateRoute
          component={Help}
          exact
          layout={MainLayout}
          layoutTitle="Help & Support"
          path="/help"
        />

        <SimpleRouter title="Sign in" path="/sign-in" page={SignIn} />
        <SimpleRouter title="Sign up" path="/sign-up" page={SignUp} />

        <SimpleRouter
          title="Page not found"
          path="/not-found"
          page={NotFound}
        />

        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
