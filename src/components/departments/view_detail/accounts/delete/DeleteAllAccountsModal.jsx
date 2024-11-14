import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteAllAccountsModal = React.memo((props) => {

    const getFullnamesAndUsernames = () => {
        return props.accounts.map(account =>
            `<b>${account.fullname}</b>(${account.username})`
        );
    }

    return (
        <Modal
            show={true}
            onHide={props.isHideModal}
        >
            <Modal.Header closeButton>Delete All Accounts Modal</Modal.Header>
            <Modal.Body className="text-center m-3">
                <p className="mb-0">
                    Do you wanna remove {" "}
                    <span dangerouslySetInnerHTML={{ __html: getFullnamesAndUsernames().join(", ") }} />
                    ?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.isHideModal}>
                    Close
                </Button>{" "}
                <Button variant="primary" onClick={async () => {
                    await props.onDeleteAll();
                    props.isHideModal();
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteAllAccountsModal;