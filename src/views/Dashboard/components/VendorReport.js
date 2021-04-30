import React, { useState, useMemo } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardActions, CardContent, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import ReactTable from "core/ReactTable";
import report_columns from "common/TableColumns/report_columns";
import { formatMoney } from "core/utils/format_util";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    position: "relative",
  },
  actions: {
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: 700,
  },
}));

const VendorReport = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const payableAmount = useMemo(() => {
    let total = 0;
    props.data.forEach((item) => {
      total += parseFloat(item.payment);
    });
    return formatMoney(total);
  }, [props.data]);

  const [totalPayable, setTotalPayable] = useState(payableAmount);

  const handleOnFilter = (data) => {
    let total = 0;
    data.forEach((item) => {
      total += parseFloat(item.payment);
    });

    setTotalPayable(formatMoney(total));
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent style={{ padding: 0 }}>
        <div className={classes.chartContainer}>
          <ReactTable
            onFilter={handleOnFilter}
            options={{
              search: false,
              selection: false,
            }}
            columns={report_columns}
            data={props.data}
            title="Vendor Earning"
            filtering={["username", "type"]}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Total Earn: ${totalPayable}
        </Typography>
      </CardActions>
    </Card>
  );
};

VendorReport.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
};

export default VendorReport;
