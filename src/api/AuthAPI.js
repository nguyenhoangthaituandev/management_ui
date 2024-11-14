import storage from '../utils/storage';
import UnauthorApi from './baseAPI/UnauthorBaseApi';
import AuthorApi from './baseAPI/AuthorBaseApi';

class AuthAPI {

    constructor() {
        this.url = "/auth";
    }

    signIn = (username, password) => {
        const body = {
            "username": username,
            "password": password
        }
        return UnauthorApi.post(`${this.url}/login`, body);
    };

    refreshToken = async () => {
        try {
            const data = await UnauthorApi.get(`${this.url}/refreshtoken?refreshToken=${storage.getRefreshToken()}`);
            storage.saveNewTokenInfo(data.token, data.refreshToken);
        } catch (error) {
            // refresh token is expired
            if (error.response.status === 400) {
                window.location.href = "/auth/sign-in";
            }
        }
        return;
    };

    signUp = (firstname, lastname, username, email, password) => {
        let body = {
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "email": email,
            "password": password,
        }
        return UnauthorApi.post(`${this.url}/registration`, body);
    }

    resendActiveAccountEmail = (username) => {
        return UnauthorApi.get(`${this.url}/registration/active-mail?username=${username}`);
    }

    sendEmailToChangePassword = (usernameOrEmail) => {
        return UnauthorApi.get(`${this.url}/password/forgot-mail?usernameOrEmail=${usernameOrEmail}`);
    };

    getUsernameFromForgotPasswordToken = (forgotPasswordToken) => {
        return UnauthorApi.get(`${this.url}/password/forgot/username?forgotPasswordToken=${forgotPasswordToken}`);
    }

    resetNewPassword = (forgotPasswordToken, newPassword) => {
        let body = {
            "forgotPasswordToken": forgotPasswordToken,
            "newPassword": newPassword,
        };
        return UnauthorApi.put(`${this.url}/password/new-password`, body);
    }

    changePassword = (oldPassword, newPassword) => {
        let body = {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
        };
        return AuthorApi.put(`${this.url}/password/change`, body);
    }
}

export default new AuthAPI();