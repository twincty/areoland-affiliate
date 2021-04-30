import React, { useEffect } from "react";
import { Route } from "react-router-dom";

const SimpleRouter = (props) => {
  const { page: Page, path, title } = props;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Route exact path={path}>
      <Page />
    </Route>
  );
};

export default SimpleRouter;
