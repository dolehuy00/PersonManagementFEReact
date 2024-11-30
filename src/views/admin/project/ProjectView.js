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
import { useLocation } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import SearchWithPopup from "components/Popups/SearchWithPopup.js";
// component
import Header from "components/Headers/Header.js";
import LoadingOrError from "components/Notifications/LoadingOrError.js";
import DatePickerWithTooltip from "components/DateTimePickers/DatePickerWithTooltip.js";
import { useSearchEmployee } from "hooks/UseEmployeeApi.js";
// custom hooks
import {
    useGetOneProject,
    useEditProject,
    useChangeStatusProject
} from "hooks/UseProjectApi.js";

const ViewProject = () => {
    // search params
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get("id");
    const mode = searchParams.get("mode")
    let arrSetValueInput = useState([]);
    // state
    const [formValues, setFormValues] = useState({});
    const [formValuesDefault, setFormValuesDefault] = useState({});
    const [viewMode, setViewMode] = useState(mode || "");
    const [formValueIsValid, setFormValueIsValid] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [statusValue, setStatusValue] = useState("");

    // request data
    const { data: dataGetProj, loading: loadingGetProj, error: errorGetProj } = useGetOneProject(projectId);
    const { data: dataEditResponse, loading: loadingEdit, error: errorEdit } = useEditProject(dataEdit);
    const { data: dataLockResponse, loading: loadingLock, error: errorLock, request: requestLock } = useChangeStatusProject();

    // effect
    useEffect(() => {
        if (Object.keys(dataGetProj).length > 0) {
            setDataForm(dataGetProj);
            setFormValuesDefault(dataGetProj)
            console.log(formValues)
            setStatusValue(dataGetProj.results[0].status || "")
        }
    }, [dataGetProj]);

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

    useEffect(() => {
        if (errorLock) {
            toast.error(`Change status fail, ${errorLock.response?.data?.messages[1]}`, {
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
    }, [errorLock]);

    useEffect(() => {
        if (dataLockResponse.status === 200) {
            setStatusValue(dataLockResponse?.messages[1])
            toast.success('Change status successfully', {
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
    }, [dataLockResponse]);


    // handle function
    const handleSubmit = (event) => {
        event.preventDefault();
        setDataEdit(formValues);
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

    const handleLock = () => {
        requestLock(projectId, statusValue)
    }


    // other function
    const isEditMode = () => {
        return viewMode === "edit";
    };

    const setDataForm = (data) => {
        if (data.results) {
            const result = data.results[0];
            setFormValues({
                id: result.id || -1,
                name: result.name || "",
                taskDetail: result.taskDetail || "",
                leaderId: result.leaderId || -1
            });
            arrSetValueInput[0]({ fullname: result.leaderName, id: result.leaderId })
        }
    }


    // render
    if (loadingGetProj) return (
        <>
            <Header />
            <LoadingOrError status="loading" />
        </>
    );
    if (errorGetProj) return (
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
                                            {isEditMode() ? "Edit Project" : "View Project"}
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
                                {dataGetProj.results
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
                                                                Project ID
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
                                                                htmlFor="input-name"
                                                            >
                                                                Project Name
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-name"
                                                                type="text"
                                                                name="name"
                                                                value={formValues.name || ""}
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
                                                                htmlFor="input-taskDetail"
                                                            >
                                                                Main Task
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                id="input-taskDetail"
                                                                type="text"
                                                                name="taskDetail"
                                                                value={formValues.taskDetail || ""}
                                                                onChange={handleInputChange}
                                                                required
                                                                disabled={!isEditMode()}
                                                            />
                                                        </FormGroup>
                                                    </Col>                                                    
                                                </Row>                                                
                                            </div>
                                            <div className="pl-lg-4">                                                
                                                <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-status"
                                                        >
                                                            Leader
                                                        </label>
                                                        <SearchWithPopup
                                                            titleModal="Search Employee (Name or ID)"
                                                            nameInput="leaderId"
                                                            searchApiFunc={useSearchEmployee}
                                                            propertyInDataToViewSearch={
                                                                [
                                                                    { text: "ID: ", property: "id" },
                                                                    { text: " ~ ", property: "fullname" }
                                                                ]
                                                            }
                                                            propertyInDataToViewDisableInput={["id", "fullname"]}
                                                            propertyInDataToSetRealInput="id"
                                                            required="required"
                                                            deboundTimeOut={1500}
                                                            arraySetValueInput = {arrSetValueInput}
                                                        />
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
                                                            <Row>
                                                                <Col>
                                                                    <Input
                                                                        className="form-control-alternative"
                                                                        id="input-status"
                                                                        type="text"
                                                                        value={statusValue}
                                                                        required
                                                                        disabled="disabled"
                                                                    />
                                                                </Col>
                                                                {viewMode === "edit"
                                                                    ? (<>
                                                                        <Col lg={{ size: "auto" }} className="pl-0">
                                                                            <Button
                                                                                color={statusValue === "Active" ? "warning" : "info"}
                                                                                type="button"
                                                                                disabled={loadingLock}
                                                                                onClick={handleLock}
                                                                            >
                                                                                {loadingLock
                                                                                    ? (<Spinner color="primary" size="sm"> </Spinner>)
                                                                                    : statusValue === "Active" ? "Lock" : "Unlock"
                                                                                }
                                                                            </Button>
                                                                        </Col>
                                                                    </>)
                                                                    : ""
                                                                }
                                                            </Row>
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

export default ViewProject;