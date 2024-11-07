import React from "react";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col,
    Container
} from "reactstrap";

import DatePicker from "components/Dropdowns/DatePicker.js";

class Modals extends React.Component {
    state = {
        exampleModal: false
    };
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };
    render() {
        return (
            <>
                {/* Button trigger modal */}
                <Button
                    color="primary"
                    type="button"
                    outline
                    size="sm"
                    onClick={() => this.toggleModal("exampleModal")}>
                    <i className="fas fa-filter"></i><span>(2)</span>
                </Button>
                {/* Modal */}
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.exampleModal}
                    toggle={() => this.toggleModal("exampleModal")}
                >
                    <div className="modal-header d-flex align-items-center">
                        <h4 className="modal-title" id="exampleModalLabel">
                            Filter
                        </h4>
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
                    <div className="modal-body">
                        <Container>
                            <Row className="d-flex align-items-center">
                                <span>Name Or Id</span>
                                <Col>
                                    <Input
                                        className="form-control-alternative"
                                        id="exampleFormControlInput1"
                                        type="email"
                                    />
                                </Col>
                                <Col>
                                <Input
                                        className="form-control-alternative"
                                        id="exampleFormControlInput1"
                                        type="email"
                                    />
                                </Col>
                            </Row>
                            <Row className="d-flex align-items-center">
                                <span>Date Of Birth</span>
                                <Col>
                                    <DatePicker/>
                                </Col>
                                <Col>
                                    <DatePicker />
                                </Col>
                            </Row>
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
                        <Button color="primary" type="button">
                            Comfirm
                        </Button>
                    </div>
                </Modal>
            </>
        );
    }
}

export default Modals;
