import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";

const phoneFormat = (val) => {
  val = val + "__________";
  if (val.length <= 21) {
    return (
      "+" +
      val.substr(0, 1) +
      " " +
      "(" +
      val.substr(1, 3) +
      ")" +
      " " +
      val.substr(4, 3) +
      "-" +
      val.substr(7, 4)
    );
  } else {
    return (
      "+" +
      val.substr(0, 2) +
      " " +
      "(" +
      val.substr(2, 3) +
      ")" +
      " " +
      val.substr(5, 3) +
      "-" +
      val.substr(8, 4)
    );
  }
};

const NumberFieldFormat = (props) => {
  const { inputRef, onChange, ...other } = props;

  let formatStyle = props.format;

  if (props.format === "phone") {
    formatStyle = phoneFormat;
  }

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange(props.name, values.value);
      }}
      format={formatStyle}
      mask={props.mask}
    />
  );
};

const NumberField = (props) => {
  return (
    <TextField
      placeholder={props.placeholder}
      InputProps={{
        inputComponent: NumberFieldFormat,
        inputProps: { format: props.format, mask: props.mask },
      }}
      {...props}
    />
  );
};

NumberField.propTypes = {
  placeholder: PropTypes.string,
  format: PropTypes.string,
  mask: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default NumberField;
