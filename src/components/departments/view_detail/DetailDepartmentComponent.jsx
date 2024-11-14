import React from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";


const DetailDepartmentComponent = React.memo((props) => {
    return (
        <>
            <Row>
                <Col sm={3}>
                    <p>Manager:</p>
                </Col>
                <Col>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>{props.info.managerEmail || ''}</Tooltip>}
                    >
                        <span>{props.info.managerFullname || ''}</span>
                    </OverlayTrigger>
                </Col>
            </Row>

            <Row>
                <Col sm={3}>
                    <p>Members:</p>
                </Col>
                <Col>
                    <span>{props.info.memberSize}</span>
                </Col>
            </Row>

            <Row>
                <Col sm={3}>
                    <p>Creator:</p>
                </Col>
                <Col>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>{props.info.creatorEmail}</Tooltip>}
                    >
                        <span>{props.info.creatorFullname}</span>
                    </OverlayTrigger>
                </Col>
            </Row>

            <Row>
                <Col sm={3}>
                    <p>Created DateTime:</p>
                </Col>
                <Col>
                    <span>{props.info.createdDateTime}</span>
                </Col>
            </Row>
        </>
    );
})

export default DetailDepartmentComponent;