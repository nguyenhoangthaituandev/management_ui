import UnauthorAPI from './baseAPI/UnauthorBaseApi';
import AuthorAPI from './baseAPI/AuthorBaseApi';

class UserAPI {
    constructor() {
        this.url = "/accounts";
    }

    existsByUsername = (username) => {
        return UnauthorAPI.get(`${this.url}/username/exists?username=${username}`);
    }

    existsByEmail = (email) => {
        return UnauthorAPI.get(`${this.url}/email/exists?email=${email}`);
    }

    existsByUsernameOrEmail = (usernameOrEmail) => {
        return UnauthorAPI.get(`${this.url}/usernameOrEmail/exists?usernameOrEmail=${usernameOrEmail}`);
    }

    getDepartmentInfo = () => {
        return AuthorAPI.get(`${this.url}/department`);
    };

    getAllAccountsByNoDepartment = (search, sortField, isASC) => {
        let url = `${this.url}/noDepartment`;

        // search
        if (search) {
            url += `?q=${search}`;
        }

        // sort
        if (sortField) {
            url += url.includes("?") ? `&` : "?";
            url += `sort=${sortField},${isASC ? "asc" : "desc"}`;
        }

        return AuthorAPI.get(url);
    }

    getInfoAccountsByUsernames = (usernames) => {
        return AuthorAPI.get(`${this.url}/info?usernames=${usernames.join(",")}`);
    }
}

export default new UserAPI();