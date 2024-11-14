import React from 'react';
import { connect } from 'react-redux';
import { selectIsLogin } from '../redux/selector/UserInfoSelector';
import { Navigate } from 'react-router-dom';

function Auth(props) {

    if (!props.isLogin) {
        return <Navigate to="/auth/sign-in" />;
    }

    return <>{props.children}</>
}

export default connect(
    state => {
        return {
            isLogin: selectIsLogin(state),
        };
    }
)(Auth);