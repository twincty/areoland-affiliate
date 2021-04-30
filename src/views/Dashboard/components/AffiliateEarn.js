import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { formatMoney } from "core/utils/format_util";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.success.dark,
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1),
  },
}));

const AffiliateEarn = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              AFFILIATED EARN
            </Typography>
            <Typography variant="h1">
              ${formatMoney(props.data.totalEarn - props.data.totalPaid)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography className={classes.caption} variant="caption">
            <Tooltip title="Total Earning" placement="top" arrow>
              <span>${formatMoney(props.data.totalEarn)}</span>
            </Tooltip>
            <Tooltip title="Total Paid" placement="top" arrow>
              <span> - ${formatMoney(props.data.totalPaid)}</span>
            </Tooltip>
            <br />
            Earn from Users who are registered using your affiliated link.
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

AffiliateEarn.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
};

export default AffiliateEarn;
