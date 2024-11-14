
import React from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import TableComponent from "./TableComponent";
import PagingComponent from "../../common/table/PagingComponent";
import { useMemo } from "react";
import SearchComponent from "../../common/table/SearchComponent";
import { PlusCircle, RefreshCcw, Upload } from "react-feather";
import FilterComponent from "./FilterComponent";
import DepartmentNoDataComponent from "./DepartmentNoDataComponent";


const DepartmentTableComponent = (props) => {
    const TableComponentMemo = useMemo(() =>
        < TableComponent
            departments={props.departments}
            //paging
            resetPaging={props.resetPaging}
            // sorting
            currentSort={props.currentSort}
            setCurrentSort={props.setCurrentSort}
            //onclick
            onClickItem={props.onClickItem}
            onUpdateItem={props.onUpdateItem}
            onDeleteItem={props.onDeleteItem}

        />
        , [props.departments, props.currentSort])

    const PagingComponentMemo = useMemo(() =>
        <PagingComponent
            totalPages={props.totalPages}
            currentPage={props.currentPage}
            setCurrentPage={props.setCurrentPage}
        />
        , [props.totalPages, props.currentPage])

    const SearchComponentMemo = useMemo(() =>
        <SearchComponent
            // search
            currentSearch={props.currentSearch}
            setCurrentSearch={props.setCurrentSearch}
            //paging
            resetPaging={props.resetPaging}
            //sort
            resetCurrentSort={props.resetCurrentSort}
            // refresh table 
            timeRefreshTable={props.timeRefreshTable}
        />
        , [props.currentSearch, props.timeRefreshTable])

    const FilterComponentMemo = useMemo(() =>
        <FilterComponent
            //filter
            currentFilter={props.currentFilter}
            setCurrentFilter={props.setCurrentFilter}
            //paging
            resetPaging={props.resetPaging}
            //sort
            resetCurrentSort={props.resetCurrentSort}
            // refresh table 
            timeRefreshTable={props.timeRefreshTable}
        />
        , [props.currentFilter, props.timeRefreshTable])

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

                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Create Department</Tooltip>}
                            >
                                <div className="ms-2" onClick={props.onCreate} >
                                    <PlusCircle size={18} />
                                </div>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip>Upload Account</Tooltip>}
                            >
                                <div className="ms-2" onClick={props.onImport} >
                                    <Upload size={18} />
                                </div>
                            </OverlayTrigger>
                        </Col>
                    </Row>

                    {/* Filter */}
                    <Row className="mb-3">
                        {FilterComponentMemo}
                    </Row>


                    {/* Table */}
                    {props.departments.length == 0
                        ? <DepartmentNoDataComponent />
                        : TableComponentMemo
                    }

                    {/* Paging */}
                    <Row>
                        <Col className="d-flex flex-row-reverse">
                            {PagingComponentMemo}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>

    );
}

export default DepartmentTableComponent;