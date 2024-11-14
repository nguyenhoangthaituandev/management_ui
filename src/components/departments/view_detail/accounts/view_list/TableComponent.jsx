import React from "react";
import { OverlayTrigger, Table, Tooltip, Form } from "react-bootstrap";
import { Trash } from "react-feather";
import SortComponent from "../../../../common/table/SortComponent"
import AdminContent from "../../../../../hoc/AdminContent";


const TableComponent = React.memo((props) => {

    const onChangeDeleteCheckboxItem = (e, accountId) => {
        let deletingAllIDs = props.deletingAllIDs;

        if (e.target.checked) {
            deletingAllIDs.add(accountId);
        } else {
            deletingAllIDs.delete(accountId);
        }

        props.setDeletingAllIDs(new Set(deletingAllIDs));
    }

    const onChangeDeleteCheckboxAllItems = (e) => {
        let deletingAllIDs = props.deletingAllIDs;

        if (e.target.checked) {
            props.accounts.forEach(account => {
                deletingAllIDs.add(account.id);
            })
        } else {
            deletingAllIDs.clear();
        }
        props.setDeletingAllIDs(new Set(deletingAllIDs));
    }

    return (
        <Table striped hover>
            <thead>
                <tr>
                    <AdminContent>
                        <th className="text-center">
                            <Form.Check
                                size='lg'
                                type='checkbox'
                                checked={props.deletingAllIDs.size === props.accounts.length && props.accounts.length != 0}
                                onChange={onChangeDeleteCheckboxAllItems}
                            />
                        </th>
                    </AdminContent>

                    <th style={{ width: "20%" }}>
                        Username
                        <SortComponent
                            currentSort={props.currentSort}
                            setCurrentSort={props.setCurrentSort}
                            APIField="username"
                            resetPaging={props.resetPaging}
                        />
                    </th>
                    <th style={{ width: "20%" }}>
                        Fullname
                        <SortComponent
                            currentSort={props.currentSort}
                            setCurrentSort={props.setCurrentSort}
                            APIField="fullname"
                            resetPaging={props.resetPaging}
                        />
                    </th>
                    <th style={{ width: "15%" }}>
                        Role
                        <SortComponent
                            currentSort={props.currentSort}
                            setCurrentSort={props.setCurrentSort}
                            APIField="role"
                            resetPaging={props.resetPaging}
                        />
                    </th>
                    <th style={{ width: "15%" }}>
                        Status
                        <SortComponent
                            currentSort={props.currentSort}
                            setCurrentSort={props.setCurrentSort}
                            APIField="status"
                            resetPaging={props.resetPaging}
                        />
                    </th>
                    <th style={{ width: "20%" }}>
                        Created Date
                        <SortComponent
                            currentSort={props.currentSort}
                            setCurrentSort={props.setCurrentSort}
                            APIField="createdDateTime"
                            resetPaging={props.resetPaging}
                        />
                    </th>
                    <AdminContent>
                        <th style={{ width: "10%" }} className="text-center">Actions</th>
                    </AdminContent>


                </tr>
            </thead>
            <tbody>
                {
                    props.accounts.map(account =>
                        <tr key={account.id}>
                            <AdminContent>
                                <th className="text-center">
                                    <Form.Check
                                        size='lg'
                                        type='checkbox'
                                        checked={props.deletingAllIDs.has(account.id)}
                                        onChange={e => onChangeDeleteCheckboxItem(e, account.id)}
                                    />
                                </th>

                            </AdminContent>
                            <td>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>{account.email || ""}</Tooltip>}
                                >
                                    <span>{account.username || ""}</span>
                                </OverlayTrigger>
                            </td>
                            <td>{account.fullname}</td>
                            <td>{account.role}</td>
                            <td>{account.status}</td>
                            <td>{account.createdDateTime}</td>
                            <AdminContent>
                                <td className="table-action text-center">
                                    <span onClick={() => props.onShowDeleteItemModal(account.id)}>
                                        <Trash className="align-middle" size={18} />
                                    </span>
                                </td>
                            </AdminContent>

                        </tr>
                    )
                }
            </tbody>
        </Table >
    );
});

export default TableComponent;