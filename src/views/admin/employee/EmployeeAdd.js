import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    Row,
    Col,
    InputGroup,
    Spinner,
} from "reactstrap";
import { useState, useRef, useEffect } from "react";
import Datetime from "react-datetime";
import { Slide, ToastContainer, toast } from 'react-toastify';
import { useAddEmployee } from "hooks/UseEmployeeApi.js";

const EmployeeAdd = ({ onCancel }) => {
    const [dataBody, setDataBody] = useState({});
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [startDate, setStartDate] = useState("");
    const formRef = useRef(null);
    const dateOfBirthRef = useRef(null);
    const startDateRef = useRef(null);

    const { data, loading, error } = useAddEmployee(dataBody);

    const handleDateOfBirthChange = (date) => setDateOfBirth(date);
    const handleStartDateChange = (date) => setStartDate(date);


    useEffect(() => {
        if (error) {
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
        if (data.status === 200) {
            handleReset();
            toast.success('Add successfully', {
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
    }, [error, data]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());
        setDataBody(data);
    };

    const handleReset = () => {
        dateOfBirthRef.current.state.inputValue = '';
        startDateRef.current.state.inputValue = '';
        setDateOfBirth('');
        setStartDate('');
        formRef.current.reset();
    };

    return (
        <>
            <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                            <h3 className="mb-0">Add Employee</h3>
                        </Col>
                        <Col className="text-right" xs="4">
                            <Button
                                color="primary"
                                href="#pablo"
                                onClick={onCancel}
                                size="sm"
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="pl-lg-4">
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
                                            required
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
                                                ref={dateOfBirthRef}
                                                inputProps={{
                                                    className: "form-control-alternative form-control",
                                                    name: "dateOfBirth",
                                                    placeholder: "YYYY-MM-DD",
                                                    required: "required"
                                                }}
                                                value={dateOfBirth}
                                                timeFormat={false}
                                                dateFormat="YYYY-MM-DD"
                                                onChange={(date) => handleDateOfBirthChange(date)}
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
                                            required
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
                                            required
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
                                            required
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
                                                ref={startDateRef}
                                                inputProps={{
                                                    className: "form-control-alternative form-control",
                                                    name: "startDate",
                                                    placeholder: "YYYY-MM-DD",
                                                    required: "required"
                                                }}
                                                value={startDate}
                                                timeFormat={false}
                                                dateFormat="YYYY-MM-DD"
                                                onChange={handleStartDateChange}
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
                                        <select
                                            id="status"
                                            name="status"
                                            className="form-control"
                                            required
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Lock">Lock</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <hr />
                        <div className="py-0 text-right">
                            <Button
                                className="btn-icon btn-3"
                                color="secondary"
                                type="button"
                                disabled={loading}
                                onClick={handleReset}
                            >
                                <i className="fa-regular fa-trash-can"></i>
                                <span className="btn-inner--text m-0">Clear</span>
                            </Button>

                            <Button className="btn-icon btn-3" color="success" type="submit" disabled={loading}>
                                <span className="btn-inner--text m-0">
                                    {loading
                                        ? (<><Spinner size="sm">Waiting...</Spinner><span> Waiting...</span></>)
                                        : (<><i className="fa-solid fa-floppy-disk"></i> Save</>)
                                    }
                                </span>
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
            <div>
                <ToastContainer />
            </div>
        </>
    )
}

export default EmployeeAdd;