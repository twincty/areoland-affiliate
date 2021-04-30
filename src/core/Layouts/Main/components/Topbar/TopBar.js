import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";

import AppActions from "store/actions/app_actions";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarHighIndex: {
    zIndex: 1301,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
}));

const TopBar = () => {
  const classes = useStyles();
  const history = useHistory();

  const isSideBarOpen = useSelector((state) => state.app.drawer.sidebar);

  return (
    <div>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isSideBarOpen,
        })}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: isSideBarOpen,
            })}
            color="inherit"
            aria-label="open drawer"
            onClick={() => AppActions.toggleSideBar(true)}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => history.push("/")}
          >
            <Avatar alt="AreoLand Logo" src="/logo.png" />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            AreoLand Affiliate Program
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
