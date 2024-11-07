import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,

} from "reactstrap";

import React from "react";

const ItemPerPageDropdown = ({ itemPerPage, arrayItems, onSelectChange }) => {

  const handleSelect = (itemPerPage) => {
    onSelectChange(itemPerPage);
  };

  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle caret
          color="primary"
          size="sm"
          outline
        >
          Item per page: {itemPerPage}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          {arrayItems.map((value) => (
            <DropdownItem
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                handleSelect(value)
              }}
            >
              Item per page: {value}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default ItemPerPageDropdown;
