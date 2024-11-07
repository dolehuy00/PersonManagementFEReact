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
} from "reactstrap";

// core components
import React, { useState } from "react";
import Header from "components/Headers/Header.js";
import { useGetPageEmployee } from "hooks/UseEmployeeApi.js";
import CustomPagination from "components/Pagination/Pagination.js";
import ItemPerPageDropdown from "components/Dropdowns/ItemPerPageDropdown.js";
import FilterPopup from "components/Popups/FilterPopup.js";

const Tables = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const arrayItemPerPage = [5, 10, 30, 50, 100];

  const { data, loading, error } = useGetPageEmployee(pageIndex, pageSize);
  const totalPage = data.totalPage;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const handleSelectPerPageChange = (newItemPerPage) => {
    setPageSize(newItemPerPage);
    setPageIndex(1);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Container>
                  <Row>
                    <Col>
                      <h3 className="mb-0">Employees</h3>
                    </Col>
                    <Col className="text-right">
                      <FilterPopup />
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
                                src={require("../../assets/img/theme/bootstrap.jpg")}
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
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Something else here
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
                      <ItemPerPageDropdown itemPerPage={pageSize} arrayItems={arrayItemPerPage} onSelectChange={handleSelectPerPageChange} />
                    </Col>
                    <Col>
                      <CustomPagination pageIndex={pageIndex} totalPage={totalPage} maxPageView={5} onPageChange={handlePageChange} />
                    </Col>
                  </Row>
                </Container>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
