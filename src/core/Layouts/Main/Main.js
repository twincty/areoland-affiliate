import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { TopBar, SideBar } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Main = (props) => {
  const classes = useStyles();

  const { children } = props;
  return (
    <div className={classes.root}>
      <TopBar title={props.title} />
      <SideBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

Main.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Main;
