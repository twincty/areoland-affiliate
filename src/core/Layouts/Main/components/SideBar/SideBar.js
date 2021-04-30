import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useSelector } from "react-redux";

import AppActions from "store/actions/app_actions";
import SideBarNav from "./components/SideBarNav";
import { withRouter } from "react-router-dom";
import menuList from "./components/menu_list";
import { filterMenu } from "core/utils/menu_util";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const SideBar = ({ match }) => {
  const classes = useStyles();

  const open = useSelector((state) => state.app.drawer.sidebar);

  const handleDrawerClose = () => {
    AppActions.toggleSideBar(false);
  };

  const pages = filterMenu(menuList, match);

  let parentRedirectLink = pages[0].link;
  if (pages[0].params) {
    const linkParams = pages[0].params.reduce((r, param) => {
      r += "/" + match.params[param];
      return r;
    }, "");
    parentRedirectLink += linkParams;
  }

  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {pages[0].parent ? (
            <Button
              component={RouterLink}
              to={parentRedirectLink}
              startIcon={pages[0].icon}
              style={{ flexGrow: 1 }}
            >
              {pages[0].title}
            </Button>
          ) : (
            <div style={{ flexGrow: 1 }} />
          )}

          <div>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
        <SideBarNav pages={pages} />
      </Drawer>
    </>
  );
};

export default withRouter(SideBar);
