
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
} from "reactstrap";

import React from "react";
import { useForgotPassword } from "hooks/UseAuthApi";
import FormForgotPasswordInputCode from "components/Form/FormForgotPasswordInputCode.js";
import FormForgotPasswordRequest from "components/Form/FormForgotPasswordRequest.js";
import FormForgotPasswordChangePassword from "components/Form/FormForgotPasswordChangePassword.js";

const ForgotRequest = () => {
    const { handleForgot, isLoading, error } = useForgotPassword();

    const onSubmit = async (email) => {
        await handleForgot(email);
    };

    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent">
                        <div className="text-muted text-center mt-2 mb-3">
                            <h4>Forgot Password</h4>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <FormForgotPasswordRequest
                            onSubmit={onSubmit}
                            error={error}
                            isLoading={isLoading}
                        />
                        <FormForgotPasswordInputCode />
                        <FormForgotPasswordChangePassword />
                    </CardBody>
                </Card>
                <Row className="mt-3">
                    <Col xs="6">
                        <a
                            className="text-light"
                            href="login"
                        >
                            <small>Back to sign in</small>
                        </a>
                    </Col>
                </Row>
            </Col>
        </>
    );
};

export default ForgotRequest;
