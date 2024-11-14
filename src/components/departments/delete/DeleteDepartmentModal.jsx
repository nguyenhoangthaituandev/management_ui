import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteDepartmentModal = React.memo((props) => {
    return (
        <Modal
            show={true}
            onHide={props.isHideModal}
        >
            <Modal.Header closeButton>Delete Department Modal</Modal.Header>
            <Modal.Body className="text-center m-3">
                <p className="mb-0">
                    Do you wanna delete <span className="text-danger">{props.departmentName}</span> department?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.isHideModal}>
                    Close
                </Button>{" "}
                <Button variant="primary" onClick={props.onSubmit}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteDepartmentModal;