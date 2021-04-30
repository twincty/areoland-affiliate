import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HelpIcon from "@material-ui/icons/Help";

const menuList = [
  {
    title: "Dashboard",
    link: "/",
    icon: <DashboardIcon />,
  },
  {
    title: "Help & Support",
    link: "/help",
    icon: <HelpIcon />,
    children: [],
  },
];

export default menuList;
