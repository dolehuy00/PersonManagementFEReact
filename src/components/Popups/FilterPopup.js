import React from "react";
// reactstrap components
import {
    Button,
    Form,
    Input,
    Modal,
    Row,
    Col,
    Container
} from "reactstrap";
import ReactDatetime from "react-datetime";

class Modals extends React.Component {
    state = {
        exampleModal: false,
        dataFilters: {},
    };

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            dataFilters: {
                ...prevState.dataFilters,
                [name]: value
            }
        }));
    };

    handleDateChange = (date, name) => {
        this.setState(prevState => ({
            dataFilters: {
                ...prevState.dataFilters,
                [name]: date
            }
        }));
    };

    render() {
        const { itemSingleFilters, itemRangeFilters, onConfirmFilter, dataFilterUseState } = this.props;

        const handleOpen = () => {
            Object.entries(dataFilterUseState).forEach(([key, value]) => {
                this.setState(prevState => ({
                    dataFilters: {
                        ...prevState.dataFilters,
                        [key]: value
                    }
                }));
            });
        };

        const handleConfirm = (event) => {
            event.preventDefault();
            onConfirmFilter(this.state["dataFilters"]);
            this.toggleModal("exampleModal");
        };

        return (
            <>
                {/* Button trigger modal */}
                <Button
                    color="primary"
                    type="button"
                    outline
                    size="sm"
                    onClick={() => {
                        this.toggleModal("exampleModal");
                        handleOpen()
                    }}>
                    <i className="fas fa-filter"></i>
                    <span>
                        ({Object.values(dataFilterUseState).filter(value => value !== "").length})
                    </span>
                </Button>
                {/* Modal */}
                <Modal
                    className="modal-dialog-centered  modal-lg"
                    isOpen={this.state.exampleModal}
                    toggle={() => this.toggleModal("exampleModal")}
                >
                    <div className="modal-header d-flex align-items-center">
                        <h3 className="modal-title" id="exampleModalLabel">
                            Filter
                        </h3>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("exampleModal")}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <Form onSubmit={handleConfirm}>
                        <div className="modal-body pt-0">
                            <Container>
                                {itemSingleFilters && (<h3 className="text-center mt-0">Single Filter</h3>)}
                                {itemSingleFilters
                                    ? itemSingleFilters.map((item) => (
                                        <Row
                                            className="d-flex align-items-center mb-2"
                                            key={"filter-input-" + item.nameInput}
                                        >
                                            <Col lg="3">
                                                <span>{item.labelName}</span>
                                            </Col>
                                            <Col>
                                                <Input
                                                    className="form-control-alternative text-body"
                                                    id="exampleFormControlInput1"
                                                    type={item.type}
                                                    name={item.nameInput}
                                                    value={this.state.dataFilters[item.nameInput] || ""}
                                                    onChange={this.handleInputChange}
                                                />
                                            </Col>
                                        </Row>))
                                    : ""}
                                {itemRangeFilters && (<h3 className="text-center mt-4">Range Filter</h3>)}
                                {itemRangeFilters
                                    ? itemRangeFilters.map((item) => (
                                        item.type === "date"
                                            ? (
                                                <Row
                                                    className="d-flex align-items-center mb-2"
                                                    key={"filter-input-" + item.nameInputFrom}
                                                >
                                                    <Col lg="3">
                                                        <span>{item.labelName}</span>
                                                    </Col>
                                                    <Col>
                                                        <div className="input-group-alternative rounded-lg">
                                                            <ReactDatetime
                                                                inputProps={{
                                                                    className: "form-control-alternative text-body form-control",
                                                                    name: item.nameInputFrom,
                                                                    placeholder: "YYYY-MM-DD",
                                                                }}
                                                                timeFormat={false}
                                                                dateFormat="YYYY-MM-DD"
                                                                value={this.state.dataFilters[item.nameInputFrom] || ""}
                                                                onChange={(date) => this.handleDateChange(date, item.nameInputFrom)}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <span>-</span>
                                                    <Col>
                                                        <div className="input-group-alternative rounded-lg">
                                                            <ReactDatetime
                                                                inputProps={{
                                                                    className: "form-control-alternative text-body form-control",
                                                                    name: item.nameInputTo,
                                                                    placeholder: "YYYY-MM-DD",
                                                                }}
                                                                timeFormat={false}
                                                                dateFormat="YYYY-MM-DD"
                                                                value={this.state.dataFilters[item.nameInputTo] || ""}
                                                                onChange={(date) => this.handleDateChange(date, item.nameInputTo)}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            )
                                            : (
                                                <Row
                                                    className="d-flex align-items-center mb-2"
                                                    key={"filter-input-" + item.nameInputFrom}
                                                >
                                                    <Col lg="3">
                                                        <span>{item.labelName}</span>
                                                    </Col>
                                                    <Col>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="exampleFormControlInput1"
                                                            type={item.type}
                                                            name={item.nameInputFrom}
                                                            value={this.state.dataFilters[item.nameInputFrom] || ""}
                                                            onChange={this.handleInputChange}
                                                        />
                                                    </Col>
                                                    <span>-</span>
                                                    <Col>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="exampleFormControlInput1"
                                                            type={item.type}
                                                            name={item.nameInputTo}
                                                            value={this.state.dataFilters[item.nameInputTo] || ""}
                                                            onChange={this.handleInputChange}
                                                        />
                                                    </Col>
                                                </Row>
                                            )
                                    ))
                                    : ""
                                }
                            </Container>
                        </div>
                        <div className="modal-footer">
                            <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("exampleModal")}
                            >
                                Close
                            </Button>
                            <Button color="primary" type="submit">
                                Comfirm
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Modals;
