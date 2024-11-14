import React, { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import UserAPI from "../../api/UserAPI";
import AuthAPI from "../../api/AuthAPI";
import ForgotPasswordComponent from "../../components/auth/ForgotPasswordComponent";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const existsByUsernameOrEmail = useCallback(async (usernameOrEmail) => {
    return await UserAPI.existsByUsernameOrEmail(usernameOrEmail);
  }, []);

  const sendEmailToChangePassword = useCallback(async (usernameOrEmail) => {
    await AuthAPI.sendEmailToChangePassword(usernameOrEmail);
    navigate("/auth/forgot-password-notification");
  }, []);

  return (
    <>
      <Helmet title="Reset Password" />
      <ForgotPasswordComponent
        existsByUsernameOrEmail={existsByUsernameOrEmail}
        sendEmailToChangePassword={sendEmailToChangePassword}
      />
    </>
  );
};

export default ForgotPasswordPage;
