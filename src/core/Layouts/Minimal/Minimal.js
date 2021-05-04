import React from "react";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PaymentIcon from "@material-ui/icons/Payment";

import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    height: "100vh",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  quote: {
    padding: 8,
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aliceblue",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  quoteInner: {
    flexBasis: "600px",
  },
  quoteText: {
    color: theme.palette.common.black,
    fontSize: 20,
    padding: 8,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white,
  },
  bio: {
    color: theme.palette.common.white,
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  textIcon: { fontSize: 100, color: "#61a3e0" },
  textContainer: { backgroundColor: "#e4f2ff", marginTop: 20 },
}));

const Minimal = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Paper elevation={0} className={classes.textContainer}>
                <Grid container>
                  <Grid item xs={3}>
                    <PeopleAltIcon className={classes.textIcon} />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography className={classes.quoteText} variant="h1">
                      Become a partner with us, join our affiliate program and
                      earn money on each signup.
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={0} className={classes.textContainer}>
                <Grid container>
                  <Grid item xs={9}>
                    <Typography className={classes.quoteText} variant="h1">
                      Get 30% on each signup for whole year. As many users
                      signup from your affiliate link you will get paid more and
                      more.
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <MonetizationOnIcon className={classes.textIcon} />
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={0} className={classes.textContainer}>
                <Grid container>
                  <Grid item xs={3}>
                    <PaymentIcon className={classes.textIcon} />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography className={classes.quoteText} variant="h1">
                      There is no minimum balance require to get paid, you will
                      be paid as early as your first user signup.
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>{props.children}</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Minimal;
