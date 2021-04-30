import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink, Redirect, withRouter } from "react-router-dom";
import clsx from "clsx";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { useSelector } from "react-redux";
import { not_in_array, in_array } from "core/utils/array_util";
import { createSelector } from "reselect";

const useStyles = makeStyles({
  tooltip: {
    fontSize: 12,
    fontWeight: 500,
  },
});

const checkUserType = createSelector(
  (state) => state.user,
  (user) => user.type
);

const checkSideBar = createSelector(
  (state) => state.app,
  (app) => app.drawer.sidebar
);

const SideBarNav = ({ pages, match, history }) => {
  const classes = useStyles();

  const userType = useSelector(checkUserType);
  const isSidebarOpen = useSelector(checkSideBar);

  return (
    <MenuList style={{ outline: "none" }}>
      {pages.map((page) => {
        let redirectLink = page.link;
        if (page.params) {
          const linkParams = page.params.reduce((r, param) => {
            r += "/" + match.params[param];
            return r;
          }, "");
          redirectLink += linkParams;
        }

        if (page.parent && !isSidebarOpen) {
          return (
            <div key={page.title} style={{ textAlign: "center" }}>
              <Tooltip title="Back" placement="right">
                <IconButton
                  onClick={() => {
                    history.push(redirectLink);
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </Tooltip>
              <Divider />
            </div>
          );
        }
        // Check user has permission for this menu or not
        if (page.permissions) {
          if (page.permissions.allow) {
            if (not_in_array(page.permissions.allow, userType)) {
              if (match.path === page.link) {
                return <Redirect key={page.title} to="/forbidden" />;
              }
              return null;
            }
          } else if (page.permissions.deny) {
            if (in_array(page.permissions.deny, userType)) {
              if (match.path === page.link) {
                return <Redirect key={page.title} to="/forbidden" />;
              }
              return null;
            }
          }
        }

        return (
          <MenuItem
            activeStyle={{ pointerEvents: "none" }}
            activeClassName={clsx("Mui-selected")}
            component={NavLink}
            exact={page.link === "/" ? true : false}
            to={redirectLink}
            key={page.title}
          >
            <Tooltip classes={{ tooltip: classes.tooltip }} title={page.title}>
              <ListItemIcon color="primary">{page.icon}</ListItemIcon>
            </Tooltip>
            <ListItemText primary={page.title} />
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default withRouter(SideBarNav);
