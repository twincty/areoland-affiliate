import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-table/core/Card";
import CardHeader from "@material-table/core/CardHeader";
import CardContent from "@material-table/core/CardContent";
import CardActions from "@material-table/core/CardActions";
import Grid from "@material-table/core/Grid";
import Divider from "@material-table/core/Divider";
import Typography from "@material-table/core/Typography";

import ReactTable from "core/ReactTable";
import { formatMoney } from "core/utils/format_util";

import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import TableSkeleton from "core/Skeleton/TableSkeleton";
import { dashboardAPI } from "api/areoland";
import { isEmptyObject } from "core/utils/object_util";
import DateFormat from "core/utils/DateFormat";

const affiliate_user_column = [
  { title: "Name", field: "name" },
  { title: "Address", field: "address" },
  { title: "Email", field: "email" },
  {
    title: "Created On",
    field: "created_on",
    render: (rowData) => <DateFormat date={rowData.created_on} />,
  },
  { title: "Earn", field: "earn", type: "currency" },
];

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const userData = useSelector((state) => state.user);
  const [dashboardData, setDashboardData] = useState({});

  const loadDashboardData = async () => {
    if (isEmptyObject(dashboardData)) {
      const response = await dashboardAPI(userData.token);
      if (!response.error) {
        setDashboardData(response);
      } else {
        enqueueSnackbar(response.error.message, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (isEmptyObject(dashboardData)) {
    return null;
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        subheader={
          <>
            <Typography>
              Share affiliate link and earn $15 USD on every signup. Below is
              your affiliate link
            </Typography>
            <br />
            <Typography>
              {`https://areoland.com/affiliate/${userData.user_id}`}
            </Typography>
          </>
        }
        title="Affiliate"
      />
      <Divider />
      <CardContent style={{ padding: 0 }}>
        <Grid container spacing={6} wrap="wrap">
          <Grid className={classes.item} item xs={12}>
            {isEmptyObject(dashboardData) ? (
              <TableSkeleton cols={5} rows={5} />
            ) : (
              <ReactTable
                options={{
                  search: false,
                }}
                columns={affiliate_user_column}
                data={dashboardData.affiliate_earn.user_list}
                title="Affiliated Users"
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Typography
          style={{ fontWeight: 700 }}
          color="textSecondary"
          gutterBottom
        >
          Total Earn: ${formatMoney(0)}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Dashboard;
