import React from "react";
import { Table, OverlayTrigger, Tooltip, Form } from "react-bootstrap";


const TableComponent = React.memo((props) => {
    return (
        <>
            <Table striped hover>
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}>
                            ID
                        </th>
                        <th style={{ width: "35%" }}>
                            Username
                        </th>
                        <th style={{ width: "35%" }}>
                            Fullname
                        </th>
                        <th style={{ width: "20%" }}>
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.accounts.map(account =>
                        <tr key={account.id}>
                            <th>{account.id}</th>
                            <td>{account.username}</td>
                            <td>{account.fullname}</td>
                            <td>{account.role}</td>
                        </tr>
                    )}
                </tbody>
            </Table >

        </>

    );
});

export default TableComponent;