import React from "react";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";

import BrightnessAutoIcon from "@material-ui/icons/BrightnessAuto";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  chartContainer: {
    position: "relative",
    height: "300px",
  },
  stats: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  device: {
    textAlign: "center",
    padding: theme.spacing(1),
  },
  deviceIcon: {
    color: theme.palette.icon,
  },
  textCenter: {
    textAlign: "center",
  },
}));

const TopVendors = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: props.vendors.percentages,
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main,
        ],
        borderWidth: 8,
        borderColor: theme.palette.common.white,
        hoverBorderColor: theme.palette.common.white,
      },
    ],
    labels: props.vendors.usernames,
  };

  const options = {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: "index",
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.common.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
    },
  };

  const colorsAndIcons = [
    {
      icon: <BrightnessAutoIcon />,
      color: theme.palette.primary.main,
    },
    {
      icon: <BrightnessHighIcon />,
      color: theme.palette.error.main,
    },
    {
      icon: <BrightnessLowIcon />,
      color: theme.palette.warning.main,
    },
  ];
  const topVendors = [];
  if (props.vendors.usernames) {
    props.vendors.usernames.forEach((name, index) => {
      topVendors.push({
        title: name,
        value: props.vendors.percentages[index],
        icon: colorsAndIcons[index].icon,
        color: colorsAndIcons[index].color,
      });
    });
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Top Vendors" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          {props.vendors.percentages.length ? (
            <Doughnut data={data} options={options} />
          ) : (
            <Typography className={classes.textCenter}>
              No data to display
            </Typography>
          )}
        </div>
        <div className={classes.stats}>
          {topVendors.map((vendor) => (
            <div className={classes.device} key={vendor.title}>
              <span className={classes.deviceIcon}>{vendor.icon}</span>
              <Typography variant="body1">{vendor.title}</Typography>
              <Typography style={{ color: vendor.color }} variant="h6">
                {vendor.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

TopVendors.propTypes = {
  className: PropTypes.string,
  vendors: PropTypes.object.isRequired,
};

export default TopVendors;
