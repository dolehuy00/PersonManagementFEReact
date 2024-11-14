// reactstrap components
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
    Button,
    Input,
    CardBody,
    FormGroup,
    InputGroup,
    Spinner,
    Form
} from "reactstrap";
// core components
import { useState, useEffect } from "react";
import Datetime from "react-datetime";
import { useLocation } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import moment from "moment";
// component
import Header from "components/Headers/Header.js";
import LoadingOrError from "components/Notifications/LoadingOrError.js";
// custom hooks
import { useGetOneEmployee, useEditEmployee } from "hooks/UseEmployeeApi.js";

const ViewEmployee = () => {
    // search params
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const employeeId = searchParams.get("id");
    const mode = searchParams.get("mode")

    // state
    const [formValues, setFormValues] = useState({});
    const [formValuesDefault, setFormValuesDefault] = useState({});
    const [viewMode, setViewMode] = useState(mode || "");
    const [formValueIsValid, setFormValueIsValid] = useState(false);
    const [dataEdit, setDataEdit] = useState({});

    // request data
    const { data: dataGetEmpl, loading: loadingGetEmpl, error: errorGetEmpl } = useGetOneEmployee(employeeId);
    const { data: dataEditResponse, loading: loadingEdit, error: errorEdit } = useEditEmployee(dataEdit);

    // effect
    useEffect(() => {
        if (Object.keys(dataGetEmpl).length > 0) {
            setDataForm(dataGetEmpl);
            setFormValuesDefault(dataGetEmpl)
        }
    }, [dataGetEmpl]);

    useEffect(() => {
        if (errorEdit) {
            toast.error("Save failed, an error occurred, please try again later!", {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        }
    }, [errorEdit]);

    useEffect(() => {
        if (dataEditResponse.status === 200) {
            setFormValuesDefault(dataEditResponse)
            setDataEdit({});
            toast.success('Edit successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        }
    }, [dataEditResponse]);

    // handle function
    const handleSubmit = (event) => {
        event.preventDefault();
        setDataEdit(structuredClone(formValues));
        setFormValueIsValid(false);
    };
    const handleCancelEdit = (event) => {
        event.preventDefault();
        setViewMode("view");
        setDataForm(formValuesDefault);
        setFormValueIsValid(false);
    }
    const handleClickEdit = (event) => {
        event.preventDefault();
        setViewMode("edit");
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        setFormValueIsValid(true);
    };
    const handleDateChange = (date, name) => {
        if (moment(date, "YYYY-MM-DD", true).isValid()) {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: date.format("YYYY-MM-DD"),
            }));
            setFormValueIsValid(true);
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: "",
            }));
            setFormValueIsValid(false);
        }
    };

    // other function
    const isEditMode = () => {
        return viewMode === "edit";
    };
    const setDataForm = (data) => {
        if (data.results) {
            const result = data.results[0];
            setFormValues({
                id: result.id || -1,
                address: result.address || "",
                basicSalary: result.basicSalary || -1,
                dateOfBirth: result.dateOfBirth || "",
                fullname: result.fullname || "",
                position: result.position || "",
                startDate: result.startDate || "",
                status: result.status || ""
            });
        }
    }

    // render
    if (loadingGetEmpl) return (
        <>
            <Header />
            <LoadingOrError status="loading" />
        </>
    );
    if (errorGetEmpl) return (
        <>
            <Header />
            <LoadingOrError status="error" />
        </>
    );
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">
                                            {isEditMode() ? "Edit Employee" : "View Employee"}
                                        </h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        {isEditMode()
                                            ? (
                                                <Button
                                                    color="primary"
                                                    href="#pablo"
                                                    onClick={handleCancelEdit}
                                                    size="sm"
                                                >
                                                    Cancel
                                                </Button>
                                            )
                                            : (
                                                <Button
                                                    color="primary"
                                                    href="#pablo"
                                                    onClick={handleClickEdit}
                                                    size="sm"
                                                >
                                                    Edit
                                                </Button>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {dataGetEmpl.results
                                    ? (<>
                                        <Form onSubmit={handleSubmit}>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col lg="2">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-id"
                                                            >
                                                                Employee ID
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-id"
                                                                type="text"
                                                                name="id"
                                                                value={formValues.id || ""}
                                                                required
                                                                disabled
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-fullname"
                                                            >
                                                                Fullname
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-fullname"
                                                                type="text"
                                                                name="fullname"
                                                                value={formValues.fullname || ""}
                                                                onChange={handleInputChange}
                                                                required
                                                                disabled={!isEditMode()}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-date-of-birth"
                                                            >
                                                                Date of Birth
                                                            </label>
                                                            <InputGroup className="input-group-alternative">
                                                                <Datetime
                                                                    inputProps={{
                                                                        className: "form-control-alternative form-control",
                                                                        name: "dateOfBirth",
                                                                        required: "required",
                                                                        placeholder: "YYYY-MM-DD",
                                                                        disabled: !isEditMode()
                                                                    }}
                                                                    value={formValues.dateOfBirth || ""}
                                                                    timeFormat={false}
                                                                    dateFormat="YYYY-MM-DD"
                                                                    onChange={(date) => handleDateChange(date, "dateOfBirth")}
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-position"
                                                            >
                                                                Position
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-position"
                                                                type="text"
                                                                name="position"
                                                                value={formValues.position || ""}
                                                                required
                                                                disabled={!isEditMode()}
                                                                onChange={handleInputChange}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-basic-salary"
                                                            >
                                                                Basic Salary
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-basic-salary"
                                                                type="number"
                                                                step="0.01"
                                                                name="basicSalary"
                                                                value={formValues.basicSalary || ""}
                                                                required
                                                                disabled={!isEditMode()}
                                                                onChange={handleInputChange}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="pl-lg-4">
                                                <Row>
                                                    <Col md="12">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-address"
                                                            >
                                                                Address
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-address"
                                                                type="text"
                                                                name="address"
                                                                value={formValues.address || ""}
                                                                required
                                                                disabled={!isEditMode()}
                                                                onChange={handleInputChange}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-date-of-birth"
                                                            >
                                                                Start Date
                                                            </label>
                                                            <InputGroup className="input-group-alternative">
                                                                <Datetime
                                                                    inputProps={{
                                                                        className: "form-control-alternative form-control",
                                                                        name: "startDate",
                                                                        required: "required",
                                                                        placeholder: "YYYY-MM-DD",
                                                                        disabled: !isEditMode()
                                                                    }}
                                                                    value={formValues.startDate || ""}
                                                                    timeFormat={false}
                                                                    dateFormat="YYYY-MM-DD"
                                                                    onChange={(date) => handleDateChange(date, "startDate")}
                                                                    required
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-status"
                                                            >
                                                                Status
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-status"
                                                                type="text"
                                                                name="status"
                                                                value={formValues.status || ""}
                                                                required
                                                                disabled={!isEditMode()}
                                                                onChange={handleInputChange}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <hr />
                                            {isEditMode()
                                                ? (
                                                    <div className="py-0 text-right">
                                                        <Button className="btn-icon btn-3" color="success" type="submit" disabled={!formValueIsValid}>
                                                            <span className="btn-inner--text m-0">
                                                                {loadingEdit
                                                                    ? (<><Spinner size="sm">Waiting...</Spinner><span> Waiting...</span></>)
                                                                    : (<><i className="fa-solid fa-floppy-disk"></i> Save</>)
                                                                }
                                                            </span>
                                                        </Button>
                                                    </div>
                                                )
                                                : ""
                                            }
                                        </Form>
                                    </>)
                                    : ""}
                            </CardBody>
                        </Card>
                        <div>
                            <ToastContainer />
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default ViewEmployee;