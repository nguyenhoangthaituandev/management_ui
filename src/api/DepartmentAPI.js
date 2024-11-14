import { PAGING } from '../constants';
import AuthorAPI from './baseAPI/AuthorBaseApi';
import UnAuthorAPI from './baseAPI/UnauthorBaseApi';

class DepartmentAPI {

    constructor() {
        this.url = "/departments";
    }

    getAll = ({ page, sortField, isASC, search, minCreatedDate, maxCreatedDate, minMemberSize, maxMemberSize }) => {
        let url = this.url;
        // paging`
        url += `?page=${page}&size=${PAGING.SIZE}`;

        // sort
        if (!sortField) {
            sortField = 'id';
            isASC = false;
        }
        url += `&sort=${sortField},${isASC ? "asc" : "desc"}`;

        // search
        if (search) {
            url += `&search=${search}`;
        }

        // filter
        if (minCreatedDate) {
            url += `&minCreatedDate=${minCreatedDate}`
        }

        if (maxCreatedDate) {
            url += `&maxCreatedDate=${maxCreatedDate}`
        }

        if (minMemberSize) {
            url += `&minMemberSize=${minMemberSize}`
        }

        if (maxMemberSize) {
            url += `&maxMemberSize=${maxMemberSize}`
        }


        return AuthorAPI.get(url);
    };

    getDetail = (departmentId) => {
        return AuthorAPI.get(`${this.url}/${departmentId}`);
    };

    getAllAccountsInDepartment = ({ departmentID, page, search, minCreatedDate, maxCreatedDate, role, status, sortField, isASC }) => {
        let url = `${this.url}/${departmentID}/accounts?page=${page}&size=${PAGING.SIZE}`;

        // search
        if (search) {
            url += `&search=${search}`;
        }

        // filter
        if (minCreatedDate) {
            url += `&minCreatedDate=${minCreatedDate}`;
        }

        if (maxCreatedDate) {
            url += `&maxCreatedDate=${maxCreatedDate}`;
        }

        if (role) {
            url += `&role=${role}`;
        }

        if (status) {
            url += `&status=${status}`;
        }

        // sort
        if (!sortField) {
            sortField = "id";
            isASC = false;
        }
        url += `&sort=${sortField},${isASC ? "asc" : "desc"}`;

        return AuthorAPI.get(url);
    };

    deleteAccountInDetailDepartment = (accountID) => {
        return this.deleteAllAccountsInDetailDepartment([accountID]);
    };

    deleteAllAccountsInDetailDepartment = (accountIDs) => {
        return AuthorAPI.delete(`${this.url}/accounts/${accountIDs.join(",")}`);
    };

    existsByName = (name) => {
        return UnAuthorAPI.get(`${this.url}/name/exists?name=${name}`);
    };

    create = (name, managerId, employeeIds) => {
        let body = {
            "name": name,
            "managerId": managerId,
            "employeeIds": employeeIds
        };
        return AuthorAPI.post(`${this.url}`, body);
    };

    getAllAccountsByDepartment = (departmentId) => {
        return AuthorAPI.get(`${this.url}/${departmentId}/accounts?page=1&size=999999&sort=role,desc`);
    }

    update = (departmentId, name, managerId) => {
        let body = {
            "name": name,
            "managerId": managerId
        };
        return AuthorAPI.put(`${this.url}/${departmentId}`, body);
    }

    delete = (departmentID) => {
        return AuthorAPI.delete(`${this.url}/${departmentID}`);
    }

    getAllDepartmentForFilter = () => {
        return AuthorAPI.get(`${this.url}/filter`);
    };

    importAccounts = (departmentId, managerId, employeeIds) => {
        let body = {
            "managerId": managerId,
            "employeeIds": employeeIds
        };
        return AuthorAPI.post(`${this.url}/${departmentId}/accounts`, body);
    }
}

export default new DepartmentAPI(); 