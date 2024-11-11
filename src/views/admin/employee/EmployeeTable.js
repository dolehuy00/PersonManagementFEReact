/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

// core components
import React, { useState } from "react";
import Header from "components/Headers/Header.js";
import { useFilterEmployee } from "hooks/UseEmployeeApi.js";
import CustomPagination from "components/Pagination/Pagination.js";
import DropdownButtonSmall from "components/Dropdowns/DropdownButtonSmall.js";
import FilterPopup from "components/Popups/FilterPopup.js";
import EmployeeAdd from "./EmployeeAdd.js";

const Tables = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dataFilter, setDataFilter] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [bodyView, setBodyView] = useState("");

  const arrayItemPerPage = [
    { text: "Item per page: ", value: 5 },
    { text: "Item per page: ", value: 10 },
    { text: "Item per page: ", value: 30 },
    { text: "Item per page: ", value: 50 },
    { text: "Item per page: ", value: 100 }
  ];
  const buttonPerPageState = useState(arrayItemPerPage[0]);

  const arrayItemSortBy = [
    { text: "Sort by fullname ascending", value: "fullname:asc" },
    { text: "Sort by fullname decreasing", value: "fullname:dec" },
    { text: "Sort by birthday ascending", value: "dateOfBirth:asc" },
    { text: "Sort by birthday decreasing", value: "dateOfBirth:dec" },
    { text: "Sort by start date ascending", value: "startDate:asc" },
    { text: "Sort by start date decreasing", value: "startDate:dec" }
  ];
  const buttonSortByState = useState(arrayItemSortBy[0])

  const itemSingleFilters = [
    { labelName: "Name Or Id", nameInput: "nameOrId", type: "text" },
    { labelName: "Address", nameInput: "address", type: "text" },
    { labelName: "Position", nameInput: "position", type: "text" },
    { labelName: "Department Id", nameInput: "departmentId", type: "number" },
    { labelName: "Status", nameInput: "status", type: "text" }
  ];

  const itemRangeFilters = [
    { labelName: "Salary", nameInputFrom: "fromSalary", nameInputTo: "toSalary", type: "number" },
    { labelName: "Date Of Birth", nameInputFrom: "fromDoB", nameInputTo: "toDoB", type: "date" },
    { labelName: "Start Date", nameInputFrom: "fromStartDate", nameInputTo: "toStartDate", type: "date" }
  ];

  const { data, loading, error } = useFilterEmployee(dataFilter, sortBy, pageIndex, pageSize);
  const totalPage = data.totalPage;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleSelectPerPageChange = (newItemPerPage) => {
    setPageIndex(1);
    setPageSize(newItemPerPage);
  };

  const onConfirmFilter = (dataFilter) => {
    setPageIndex(1);
    setDataFilter(dataFilter);
  }

  const handleSelectSortByChange = (newItem) => {
    setSortBy(newItem);
  }

  const handleClickCreate = () => {
    setBodyView("create");
  }

  const handleCancelCreate = (event) => {
    event.preventDefault();
    setBodyView("table")
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            {bodyView === "create"
              ? (<EmployeeAdd onCancel={handleCancelCreate} />)
              : (
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Container>
                      <Row>
                        <Col className="text-left">
                          <Button
                            className="btn-icon btn-3"
                            size="sm" color="primary"
                            type="button"
                            onClick={handleClickCreate}
                          >
                            <i className="fa-solid fa-plus mr-1"></i>
                            <span className="btn-inner--text m-0">Create</span>
                          </Button>
                        </Col>
                        <Col className="text-right">
                          <DropdownButtonSmall
                            selectedItemState={buttonSortByState}
                            viewValue={false}
                            arrayItems={arrayItemSortBy}
                            onSelectChange={handleSelectSortByChange}
                          />
                          <FilterPopup
                            itemSingleFilters={itemSingleFilters}
                            itemRangeFilters={itemRangeFilters}
                            onConfirmFilter={onConfirmFilter}
                            dataFilterUseState={dataFilter}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr className="text-center">
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Basic Salary</th>
                        <th scope="col">Account Id</th>
                        <th scope="col">Department</th>
                        <th scope="col">Status</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        ? data.results.map((item, index) => (
                          <tr key={index} className="text-center">
                            <th scope="row">{item.id}</th>
                            <td>
                              <Media className="align-items-center">
                                <a
                                  className="avatar rounded-circle mr-3"
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../../../assets/img/theme/bootstrap.jpg")}
                                  />
                                </a>
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {item.fullname}
                                  </span>
                                </Media>
                              </Media>
                            </td>
                            <td>{item.basicSalary}</td>
                            <td>{item.accountId === null
                              ? "No account"
                              : item.accountId}
                            </td>
                            <td>{item.departmentName}</td>
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                {item.status === "Active" ? (
                                  <i className="bg-success" />
                                ) : (
                                  <i className="bg-danger" />
                                )}
                                {item.status}
                              </Badge>
                            </td>
                            <td className="text-right">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="btn-icon-only text-light"
                                  href="#pablo"
                                  role="button"
                                  size="sm"
                                  color=""
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    View
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Lock
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        ))
                        : ""}
                    </tbody>
                  </Table>
                  <CardFooter className="py-4">
                    <Container>
                      <Row>
                        <Col>
                          <DropdownButtonSmall selectedItemState={buttonPerPageState} viewValue={true} arrayItems={arrayItemPerPage} onSelectChange={handleSelectPerPageChange} />
                        </Col>
                        <Col>
                          <CustomPagination pageIndex={pageIndex} totalPage={totalPage} maxPageView={5} onPageChange={handlePageChange} />
                        </Col>
                      </Row>
                    </Container>
                  </CardFooter>
                </Card>
              )
            }
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
