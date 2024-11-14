import React from 'react';
import { connect } from 'react-redux';
import { selectRole } from '../redux/selector/UserInfoSelector';
import { ROLE } from "../constants";

function AdminContent(props) {

    if (props.role == ROLE.ADMIN) {
        return <>{props.children}</>;
    }

    return <></>;
}

export default connect(
    state => {
        return {
            role: selectRole(state)
        };
    }
)(AdminContent);