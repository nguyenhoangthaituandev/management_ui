
import React, { useMemo } from "react";
import TableComponent from "./TableComponent";
import PagingComponent from "../../../../common/table/PagingComponent";
import SearchComponent from "../../../../common/table/SearchComponent";
import FilterComponent from "./FilterComponent";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { PlusCircle, RefreshCcw, Trash } from "react-feather";
import AccountNoDataComponent from "./AccountNoDataComponent";
import AdminContent from "../../../../../hoc/AdminContent";



const AccountsTableComponent = (props) => {
    const TableComponentMemo = useMemo(() =>
        < TableComponent
            accounts={props.accounts}
            //paging
            resetPaging={props.resetPaging}
            // sorting
            currentSort={props.currentSort}
            setCurrentSort={props.setCurrentSort}
            // onclick delete item
            onShowDeleteItemModal={props.onShowDeleteItemModal}
            // onclick delete all
            deletingAllIDs={props.deletingAllIDs}
            setDeletingAllIDs={props.setDeletingAllIDs}
            onShowDeleteAllItemModal={props.onShowDeleteAllItemModal}
        />
        , [props.accounts, props.currentSort, props.deletingAllIDs])

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

                            <AdminContent>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>Delete All Accounts</Tooltip>}
                                >
                                    <div className="ms-2" onClick={props.onShowDeleteAllItemModal}>
                                        <Trash size={18} />
                                    </div>
                                </OverlayTrigger>
                            </AdminContent>

                        </Col>
                    </Row>

                    {/* Filter */}
                    <Row className="mb-3">
                        {FilterComponentMemo}
                    </Row>


                    {/* Table */}
                    {props.accounts.length == 0
                        ? <AccountNoDataComponent />
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

export default AccountsTableComponent;