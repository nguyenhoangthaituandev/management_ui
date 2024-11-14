import React, { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import SignInComponent from "../../components/auth/SignInComponent";

import { MESSAGE } from "../../constants";
import storage from "../../utils/storage";
import { refreshUserInfo } from "../../redux/reducers/UserInfoSlide";
import { connect } from "react-redux";
import AuthAPI from "../../api/AuthAPI";



const SignInPage = (props) => {
  const navigate = useNavigate();

  const signIn = useCallback(async (username, password, isRememberMe) => {
    try {
      const response = await AuthAPI.signIn(username, password);

      // save remember me
      storage.saveRememberMe(isRememberMe);
      // save user to localstorage
      storage.saveUserInfo(
        response.id,
        response.fullname,
        response.email,
        response.status,
        response.role,
        response.token,
        response.refreshToken,
      )
      // refresh redux
      props.refreshUserInfo();
      // redirect to home page
      navigate("/");
    } catch (error) {
      // 401
      if (error.response.status == 401) {
        throw new Error(MESSAGE.LOGIN_WRONG_USERNAME_OR_PASSWORD);
      } else if (error.response.status == 403) {
        throw new Error(MESSAGE.LOGIN_BLOCKED_ACCOUNT);
      }
      else {
        throw error;
      }
    }
  }, []);

  const resendAcitiveAccountEmail = useCallback(async (username) => {
    return await AuthAPI.resendActiveAccountEmail(username);
  })

  return (
    <>
      <Helmet title="Sign In" />
      <SignInComponent
        signIn={signIn}
        resendAcitiveAccountEmail={resendAcitiveAccountEmail}
      />
    </>
  );
};

export default connect(
  null,
  { refreshUserInfo }
)(SignInPage);
