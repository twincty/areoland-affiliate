import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import jwt from "jsonwebtoken";
import { isEmptyObject } from "core/utils/object_util";

const getuser = createSelector(
  (state) => state.app,
  (app) => app.user
);

const Router = (props) => {
  const {
    component: Component,
    layout: Layout,
    privateRoute,
    layoutTitle,
    ...rest
  } = props;

  useEffect(() => {
    document.title = layoutTitle;
  }, [layoutTitle]);

  const user = useSelector(getuser);

  if (!user || isEmptyObject(user)) {
    return <Redirect to="/sign-in" />;
  }

  const decodeToken = jwt.decode(user.token);
  const tokenExpire = Date.now() >= decodeToken.exp * 1000;

  if (privateRoute) {
    if (!user.is_login || tokenExpire) {
      return <Redirect to="/sign-in" />;
    }
  }

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout title={layoutTitle}>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

Router.propTypes = {
  layout: PropTypes.any.isRequired,
  layoutTitle: PropTypes.string,
  component: PropTypes.any.isRequired,
  path: PropTypes.string,
  privateRoute: PropTypes.bool,
};

export default Router;
