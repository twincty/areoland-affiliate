import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import { TextField, Link, Typography } from "@material-ui/core";

import { useSnackbar } from "notistack";

import { signinAPI } from "api/areoland";
import AppActions from "store/actions/app_actions";
import LoadingButton from "core/Components/LoadingButton";
import { UserTypes } from "constant/Enums";
import { Minimal } from "core/Layouts";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  socialButtons: {
    marginTop: theme.spacing(3),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
}));

const SignIn = (props) => {
  const { history } = props;
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    setLoading(true);

    const user = await signinAPI(
      formState.values.email,
      formState.values.password
    );
    if (user.error) {
      enqueueSnackbar(user.error.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      setLoading(false);
      AppActions.signin(user);
      history.replace("/");
    }

    setLoading(false);
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Minimal>
      <form className={classes.form} onSubmit={handleSignIn}>
        <Typography className={classes.title} variant="h2">
          Sign in
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Sign in with your credentials
        </Typography>
        <TextField
          className={classes.textField}
          error={hasError("username")}
          fullWidth
          helperText={
            hasError("username") ? formState.errors.username[0] : null
          }
          label="Username"
          name="username"
          onChange={handleChange}
          type="text"
          value={formState.values.username || ""}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          error={hasError("password")}
          fullWidth
          helperText={
            hasError("password") ? formState.errors.password[0] : null
          }
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ""}
          variant="outlined"
        />
        <LoadingButton
          title="Sign in now"
          className={classes.signInButton}
          loading={loading}
          disabled={!formState.isValid || loading}
          fullWidth
          size="large"
          type="submit"
        />
        <Typography color="textSecondary" variant="body1">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/sign-up" variant="h6">
            Sign up
          </Link>
        </Typography>
        <Link component={RouterLink} to="/forget-password" variant="h6">
          Forget Password
        </Link>
      </form>
    </Minimal>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignIn);
