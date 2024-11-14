import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthAPI from "../../api/AuthAPI";
import NewPasswordComponent from "../../components/auth/NewPasswordComponent";
import NewPasswordErrorNotification from "../../components/auth/NewPasswordErrorNotification";
import useNotification from "../../hooks/useNotification";

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const [showSuccessMessage] = useNotification();
  const [username, setUsername] = useState('');

  const [queryParameters] = useSearchParams();
  const forgotPasswordToken = queryParameters.get("forgotPasswordToken");

  // get username from token
  useEffect(() => {
    if (forgotPasswordToken) {
      getUsernameFromForgotPasswordToken();
    }
  }, []);

  const getUsernameFromForgotPasswordToken = async () => {
    try {
      const data = await AuthAPI.getUsernameFromForgotPasswordToken(forgotPasswordToken);
      setUsername(data);
    } catch (error) {
      if (error.response.status == 400) {
        // ignore
      } else {
        console.log(error);
      }
    }
  }

  const resetNewPassword = useCallback(async (newPassword) => {
    await AuthAPI.resetNewPassword(forgotPasswordToken, newPassword);
    // show notification
    showSuccessMessage('Change password successfully!');
    // redirect
    navigate("/auth/sign-in");
  }, []);

  if (!username) {
    return <NewPasswordErrorNotification />
  };

  return (
    <>
      <Helmet title="New Password" />
      <NewPasswordComponent
        username={username}
        resetNewPassword={resetNewPassword}
      />
    </>
  );
};

export default NewPasswordPage;
