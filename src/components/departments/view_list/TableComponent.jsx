import React from "react";
import { Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Edit2, Trash } from "react-feather";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {
    return (
        <>
            <Table striped hover>
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>
                            Department Name
                            <SortComponent
                                currentSort={props.currentSort}
                                APIField="name"
                                setCurrentSort={props.setCurrentSort}
                                resetPaging={props.resetPaging}
                            />
                        </th>
                        <th style={{ width: '20%' }}>
                            Manager
                            <SortComponent
                                currentSort={props.currentSort}
                                APIField="manager.fullname"
                                setCurrentSort={props.setCurrentSort}
                                resetPaging={props.resetPaging}
                            />
                        </th>
                        <th style={{ width: '15%' }}>
                            Total Member
                            <SortComponent
                                currentSort={props.currentSort}
                                APIField="memberSize"
                                setCurrentSort={props.setCurrentSort}
                                resetPaging={props.resetPaging}
                            />
                        </th>
                        <th style={{ width: '20%' }}>
                            Creator
                            <SortComponent
                                currentSort={props.currentSort}
                                APIField="creator.fullname"
                                setCurrentSort={props.setCurrentSort}
                                resetPaging={props.resetPaging}
                            />
                        </th>
                        <th style={{ width: '15%' }}>
                            Created Date
                            <SortComponent
                                currentSort={props.currentSort}
                                APIField="createdDateTime"
                                setCurrentSort={props.setCurrentSort}
                                resetPaging={props.resetPaging}
                            />
                        </th>
                        <th style={{ width: '10%' }}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.departments && props.departments.map((department, index) =>
                        <tr
                            key={department.id}
                            onClick={() => props.onClickItem(department.id)}
                        >
                            <td>{department.name}</td>
                            <td>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip> {department.managerEmail || ''}</Tooltip>}
                                >
                                    <span>{department.managerFullname || ''}</span>
                                </OverlayTrigger>
                            </td>
                            <td>{department.memberSize}</td>
                            <td>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip> {department.creatorEmail || ''}</Tooltip>}
                                >
                                    <span>{department.creatorFullname || ''}</span>
                                </OverlayTrigger>
                            </td>
                            <td>{department.createdDateTime}</td>
                            <td className="table-action">
                                <span onClick={(e) => {
                                    props.onUpdateItem(department.id);
                                    e.stopPropagation();
                                }}>
                                    <Edit2 className="align-middle me-1" size={18} />
                                </span>
                                <span onClick={(e) => {
                                    props.onDeleteItem(department.id);
                                    e.stopPropagation();
                                }}>
                                    <Trash className="align-middle" size={18} />
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

        </>

    );
});

export default TableComponent;