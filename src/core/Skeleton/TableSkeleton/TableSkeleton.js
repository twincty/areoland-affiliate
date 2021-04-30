import React from "react";
import PropTypes from "prop-types";

import Skeleton from "@material-ui/lab/Skeleton";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const TableSkeleton = (props) => {
  const { rows, cols } = props;

  const tableCols = [];
  for (let i = 0; i < cols; i++) {
    tableCols.push(
      <TableCell key={i}>
        <Typography variant="h4">
          <Skeleton animation="wave" />
        </Typography>
      </TableCell>
    );
  }

  const cellRows = [];
  for (let i = 0; i < cols; i++) {
    cellRows.push(
      <TableCell key={i}>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
    );
  }

  const tableRows = [];
  for (let i = 0; i < rows; i++) {
    tableRows.push(<TableRow key={i}>{cellRows}</TableRow>);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{tableCols}</TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

TableSkeleton.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
};

export default TableSkeleton;
