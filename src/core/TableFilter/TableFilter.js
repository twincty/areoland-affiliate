import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import PropTypes from "prop-types";

const TablerFilter = (props) => {
  const { data } = props;

  return (
    <Menu
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(props.anchorEl)}
      onClose={props.onClose}
    >
      {data.map((item) => (
        <MenuList key={item.type}>
          <MenuItem disabled>{item.title}</MenuItem>
          {item.values.map((val) => (
            <MenuItem
              key={val}
              onClick={() => props.onFilterChange(item.type, val)}
            >
              {val}
            </MenuItem>
          ))}
        </MenuList>
      ))}
    </Menu>
  );
};

TablerFilter.propTypes = {
  data: PropTypes.array,
  anchorEl: PropTypes.any,
  onFilterChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default TablerFilter;
