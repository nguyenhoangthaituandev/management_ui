import React from "react";
import { Table, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {

    const onChangeCheckboxItem = (e, employeeID) => {
        let addingIds = props.addingIds;

        if (e.target.checked) {
            addingIds.add(employeeID);
        } else {
            addingIds.delete(employeeID);
        }

        props.setAddingIds(new Set(addingIds));
    }

    return (
        <>
            <Table striped hover>
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}></th>
                        <th style={{ width: "35%" }}>
                            Username
                            <SortComponent
                                currentSort={props.currentSort}
                                setCurrentSort={props.setCurrentSort}
                                APIField="username"
                            />
                        </th>
                        <th style={{ width: "35%" }}>
                            Fullname
                            <SortComponent
                                currentSort={props.currentSort}
                                setCurrentSort={props.setCurrentSort}
                                APIField="fullname"
                            />
                        </th>
                        <th style={{ width: "20%" }}>
                            Role
                            <SortComponent
                                currentSort={props.currentSort}
                                setCurrentSort={props.setCurrentSort}
                                APIField="role"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.employees.map(employee =>
                        <tr key={employee.id}>
                            <th className="text-center">
                                <Form.Check
                                    size='lg'
                                    type='checkbox'
                                    checked={props.addingIds.has(employee.id)}
                                    onChange={e => onChangeCheckboxItem(e, employee.id)}
                                />
                            </th>
                            <td>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>{employee.email || ""}</Tooltip>}
                                >
                                    <span>{employee.username || ""}</span>
                                </OverlayTrigger>
                            </td>
                            <td>{employee.fullname}</td>
                            <td>{employee.role}</td>
                        </tr>
                    )}
                </tbody>
            </Table >

        </>

    );
});

export default TableComponent;