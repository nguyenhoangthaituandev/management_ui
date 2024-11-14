
import React from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import TableComponent from "./TableComponent";
import { useMemo } from "react";
import AccountNoDataComponent from "./AccountNoDataComponent";



const AccountTableComponent = (props) => {
    const TableComponentMemo = useMemo(() =>
        < TableComponent
            accounts={props.accounts}
        />
        , [props.accounts])
    return (
        <>
            {/* Table */}
            {props.accounts.length == 0
                ? <AccountNoDataComponent />
                : TableComponentMemo
            }
        </>

    );
}

export default AccountTableComponent;