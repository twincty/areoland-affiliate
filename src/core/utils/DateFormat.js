import React from "react";
import PropTypes from "prop-types";
import { format as dateFormat } from "date-fns";

const DateFormat = (props) => {
  const formatedDate = dateFormat(
    new Date(props.date),
    "iii LLL dd yyyy hh:mm a"
  );

  return <span>{formatedDate}</span>;
};

DateFormat.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DateFormat;
