import React from "react";
import PropTypes from "prop-types";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "7%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const LoadingButton = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { title, loading, onClick, circleStyle, ...rest } = props;

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color={theme.palette.common.primary}
        disabled={loading}
        onClick={onClick}
        {...rest}
      >
        {props.title}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          className={classes.buttonProgress}
          style={circleStyle}
        />
      )}
    </div>
  );
};

LoadingButton.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  circleStyle: PropTypes.object,
};

export default LoadingButton;
