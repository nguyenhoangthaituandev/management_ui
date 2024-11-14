import React, { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../../api/AuthAPI";
import useNotification from "../../hooks/useNotification";
import ChangePasswordComponent from "../../components/auth/ChangePasswordComponent";
import { refreshUserInfo } from "../../redux/reducers/UserInfoSlide";
import { connect } from "react-redux";
import { MESSAGE } from "../../constants";
import storage from "../../utils/storage";

const ChangePasswordPage = (props) => {
  const navigate = useNavigate();
  const [showSuccessMessage] = useNotification();

  const changePassword = useCallback(async (oldPassword, newPassword) => {
    try {
      await AuthAPI.changePassword(oldPassword, newPassword);
      // show notification
      showSuccessMessage('Change password successfully!');
      // remove storage
      storage.deleteUserInfo();
      // refresh redux
      props.refreshUserInfo();
      // redirect
      navigate("/auth/sign-in");
    } catch (error) {
      if (error.response.status == 400) {
        throw new Error(MESSAGE.CHANGE_PASSWORD_WRONG_OLD_PASSWORD);
      } else {
        throw error;
      }
    }

  }, []);


  return (
    <>
      <Helmet title="New Password" />
      <ChangePasswordComponent
        changePassword={changePassword}
      />
    </>
  );
};

export default connect(
  null,
  { refreshUserInfo }
)(ChangePasswordPage);
