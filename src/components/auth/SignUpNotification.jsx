import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "react-bootstrap";

const SignUpNotification = () => (
  <>
    <Helmet title="Sign Up" />
    <div className="text-center">
      <h2>Register Account Successfully!</h2>
      <p className="lead fw-normal mt-3 mb-4">
        We've sent a verify email to you. Please check your email and verify your account.
      </p>
      <Link to="/auth/sign-in">
        <Button variant="primary" size="lg">
          Return to Login
        </Button>
      </Link>
    </div>
  </>
);

export default SignUpNotification;