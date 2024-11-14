import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import WithLoading from '../../hoc/withLoading';
import { connect } from 'react-redux';
import { selectRole } from '../../redux/selector/UserInfoSelector';
import { ROLE } from "../../constants";
import DepartmentPage from './Department';
import UserAPI from '../../api/UserAPI';

const DepartmentRoute = (props) => {

    const [departmentID, setDepartmentID] = useState();

    useEffect(() => {
        if (props.role == ROLE.MANAGER) {
            getDepartmentInfoForManagerRole();
        }
    }, [props.role]);

    const getDepartmentInfoForManagerRole = async () => {
        const departmentInfo = await UserAPI.getDepartmentInfo();
        setDepartmentID(departmentInfo.id);
    }

    if (props.role == ROLE.ADMIN) {
        return <DepartmentPage />
    }

    const ComponentWithLoading = WithLoading(Navigate);

    return (
        <div className="text-center">
            <ComponentWithLoading
                isLoading={!departmentID}
                to={`/departments/${departmentID}`}
            />
        </div>
    );
}

export default connect(
    state => {
        return {
            role: selectRole(state)
        };
    }
)(DepartmentRoute);