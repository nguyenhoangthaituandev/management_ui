import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteAccountModal = React.memo((props) => {
    return (
        <Modal
            show={true}
            onHide={props.isHideModal}
        >
            <Modal.Header closeButton>Delete Account Modal</Modal.Header>
            <Modal.Body className="text-center m-3">
                <p className="mb-0">
                    Do you wanna delete <b>{props.account?.fullname}</b> ({props.account?.username}) ?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.isHideModal}>
                    Close
                </Button>{" "}
                <Button variant="primary" onClick={async () => {
                    await props.onDelete();
                    props.isHideModal();
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteAccountModal;