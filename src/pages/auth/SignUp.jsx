import React, { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import UserAPI from "../../api/UserAPI";
import AuthAPI from "../../api/AuthApi";

import SignUpComponent from "../../components/auth/SignUpComponent";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const existsByUsername = useCallback(async (username) => {
    return await UserAPI.existsByUsername(username);
  }, []);

  const existsByEmail = useCallback(async (email) => {
    return await UserAPI.existsByEmail(email);
  }, []);

  const signUp = useCallback(async (firstname, lastname, username, email, password) => {
    await AuthAPI.signUp(firstname, lastname, username, email, password);

    // redirect to confirm email
    navigate('/auth/sign-up-notification');
  }, [])

  return (
    <>
      <Helmet title="Sign Up" />
      <SignUpComponent
        existsByUsername={existsByUsername}
        existsByEmail={existsByEmail}
        signUp={signUp}
      />
    </>
  );
};

export default SignUpPage;
