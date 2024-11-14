
import React from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import TableComponent from "./TableComponent";
import { useMemo } from "react";
import SearchComponent from "../../common/table/SearchComponent";
import EmployeeNoDataComponent from "./EmployeeNoDataComponent";
import { RefreshCcw } from "react-feather";


const EmployeeTableComponent = (props) => {
    const TableComponentMemo = useMemo(() =>
        < TableComponent
            employees={props.employees}
            // sorting
            currentSort={props.currentSort}
            setCurrentSort={props.setCurrentSort}
            // checkbox
            addingIds={props.addingIds}
            setAddingIds={props.setAddingIds}
        />
        , [props.employees, props.currentSort])

    const SearchComponentMemo = useMemo(() =>
        <SearchComponent
            // search
            currentSearch={props.currentSearch}
            setCurrentSearch={props.setCurrentSearch}
            //sort
            resetCurrentSort={props.resetCurrentSort}
            // refresh table 
            timeRefreshTable={props.timeRefreshTable}
        />
        , [props.currentSearch, props.timeRefreshTable])

    return (
        <>
            <Card>
                <Card.Body>
                    {/* Search component */}
                    <Row className="mb-3">
                        <Col md={6} >
                            {SearchComponentMemo}
                        </Col>
                        <Col md={6} className="d-flex flex-row-reverse align-items-center">
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Refresh Table</Tooltip>}
                            >
                                <div className="ms-2" onClick={props.onResetTable}>
                                    <RefreshCcw size={18} />
                                </div>
                            </OverlayTrigger>
                        </Col>
                    </Row>

                    {/* Table */}
                    {props.employees.length == 0
                        ? <EmployeeNoDataComponent />
                        : TableComponentMemo
                    }

                </Card.Body>
            </Card>
        </>

    );
}

export default EmployeeTableComponent;