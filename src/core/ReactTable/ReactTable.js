import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import DeleteIcon from "@material-ui/icons/Delete";
import tableIcons from "./components/table_icons";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import TableFilter from "./components/TableFilter";
import CircularLoading from "core/Skeleton/CircularLoading";
import {
  array_reduce,
  array_filter,
  unique_array,
} from "core/utils/array_util";

const ReactTable = (props) => {
  const tableRef = useRef();
  const [isLoading, showLoading] = useState(false);
  const {
    exportButton,
    data,
    remoteData,
    refreshAble,
    filtering,
    onDelete,
    actions,
    options,
    ...rest
  } = props;
  const [tableData, setTableData] = useState(data);
  const [anchorEl, setAnchorEl] = useState(null);
  const filterData = [];

  useEffect(() => {
    setTableData(data);
  }, [data]);

  if (filtering) {
    filterData.push({
      type: "filter_clear",
      title: "Clear all filters",
      values: ["Clear"],
    });

    filtering.forEach((filter) => {
      filterData.push({
        type: filter,
        title: "Filter by " + filter,
        values: unique_array(array_reduce(data, filter)),
      });
    });
  }

  const openFilterMenu = (event, _) => {
    setAnchorEl(event.currentTarget);
  };

  const closeFilterMenu = () => {
    setAnchorEl(null);
  };

  const onFilterChange = (type, value) => {
    if (type === "filter_clear") {
      setTableData(data);
      if (props.onFilter) props.onFilter(data);
    } else {
      const r = array_filter(data, type, value);
      setTableData(r);
      if (props.onFilter) props.onFilter(r);
    }
    closeFilterMenu();
  };

  const onDeleteRows = async (evt, data) => {
    if (isLoading) return;

    showLoading(true);

    const rowsIds = data.reduce((r, row) => {
      r.push(row.id);
      return r;
    }, []);

    await onDelete(rowsIds, data);

    showLoading(false);
    tableRef.current.onAllSelected(false);
  };

  const refreshRemoteData = () => {
    tableRef.current && tableRef.current.onQueryChange();
  };

  return (
    <>
      <MaterialTable
        tableRef={tableRef}
        options={{
          exportMenu: [
            exportButton && {
              label: "Export as PDF",
              exportFunc: (cols, data) => ExportPdf(cols, data, props.title),
            },
            {
              label: "Export as CSV",
              exportFunc: (cols, data) => ExportCsv(cols, data, props.title),
            },
          ],
          selection: true,
          actionsColumnIndex: -1,
          columnsButton: true,
          ...options,
        }}
        actions={[
          filtering && {
            tooltip: "Filter",
            icon: FilterListIcon,
            isFreeAction: true,
            onClick: openFilterMenu,
          },
          onDelete && {
            tooltip: "Remove All Selected Rows",
            icon: () =>
              isLoading ? <CircularLoading size={30} /> : <DeleteIcon />,
            onClick: onDeleteRows,
          },
          refreshAble && {
            tooltip: "Refresh",
            icon: RefreshIcon,
            isFreeAction: true,
            onClick: refreshRemoteData,
          },
          ...actions,
        ]}
        icons={tableIcons}
        data={remoteData || tableData}
        {...rest}
      />
      {filtering && (
        <TableFilter
          onClose={closeFilterMenu}
          onFilterChange={onFilterChange}
          data={filterData}
          anchorEl={anchorEl}
        />
      )}
    </>
  );
};

ReactTable.propTypes = {
  data: PropTypes.array,
  remoteData: PropTypes.func,
  filtering: PropTypes.array,
  actions: PropTypes.array,
  onFilter: PropTypes.func,
  onDelete: PropTypes.func,
  refreshAble: PropTypes.bool,
  exportButton: PropTypes.bool,
};

ReactTable.defaultProps = {
  actions: [],
  exportButton: true,
};

export default ReactTable;
