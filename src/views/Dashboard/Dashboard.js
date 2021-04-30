import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

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
  { title: "Account Type", field: "account_type" },
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

  const userData = useSelector((state) => state.app.user);
  const [dashboardData, setDashboardData] = useState([]);

  const totalEarn = dashboardData.reduce((r, i) => r + i.earn, 0);

  const loadDashboardData = async () => {
    if (!dashboardData.length) {
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

  if (!dashboardData.length) {
    return null;
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        subheader={
          <>
            <Typography>
              Share affiliate link and earn <b>30%</b> on every signup for whole
              year. Below is your affiliate link
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
                data={dashboardData}
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
          Total Earn: ${formatMoney(totalEarn)}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Dashboard;
