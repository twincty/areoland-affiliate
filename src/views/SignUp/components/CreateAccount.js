import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import LoadingButton from "core/Components/LoadingButton";

const schema = {
  name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 50,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
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
  textField: {
    marginTop: theme.spacing(2),
  },
  signUpButton: {
    margin: theme.spacing(2, 0),
  },
}));

const CreateAccount = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

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

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    await props.onSubmit(formState.values);
    setLoading(false);
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form className={classes.form} onSubmit={handleSignUp}>
      <Typography className={classes.title} variant="h1">
        Create new account
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Use your email to create new account
      </Typography>
      <TextField
        className={classes.textField}
        error={hasError("name")}
        fullWidth
        helperText={hasError("name") ? formState.errors.name[0] : null}
        label="Full name"
        name="name"
        onChange={handleChange}
        type="text"
        value={formState.values.name || ""}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        fullWidth
        error={hasError("email")}
        helperText={hasError("email") ? formState.errors.email[0] : null}
        label="Email address"
        name="email"
        onChange={handleChange}
        type="text"
        value={formState.values.email || ""}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        error={hasError("password")}
        fullWidth
        helperText={hasError("password") ? formState.errors.password[0] : null}
        label="Password"
        name="password"
        onChange={handleChange}
        type="password"
        value={formState.values.password || ""}
        variant="outlined"
      />

      <LoadingButton
        title="Sign up now"
        className={classes.signUpButton}
        loading={loading}
        disabled={!formState.isValid || loading}
        fullWidth
        size="large"
        type="submit"
      />
      <Typography color="textSecondary" variant="body1">
        Have an account?{" "}
        <Link component={RouterLink} to="/sign-in" variant="h6">
          Sign in
        </Link>
      </Typography>
    </form>
  );
};

CreateAccount.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateAccount;
