import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

import { signupAPI } from "api/areoland";
import { Minimal } from "core/Layouts";

const SignUp = (props) => {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();

  const onFormSubmit = async (formValues) => {
    const response = await signupAPI(
      formValues.name,
      formValues.email,
      formValues.password
    );
    if (!response.error) {
      enqueueSnackbar("Successfully signup now login to your account", {
        variant: "success",
      });
      history.replace("/sign-in");
    } else {
      enqueueSnackbar(response.error.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <Minimal>
      <CreateAccount onSubmit={onFormSubmit} />
    </Minimal>
  );
};

SignUp.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignUp);
