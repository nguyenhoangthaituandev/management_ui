import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "react-bootstrap";

const ForgotPasswordNotification = React.memo((props) => (
  <>
    <Helmet title="Forgot Password" />
    <div className="text-center">
      <h2>Forgot Password!</h2>
      <p className="lead fw-normal mt-3 mb-4">
        We've sent a email to you. Please check your email to reset password.
      </p>
      <Link to="/auth/sign-in">
        <Button variant="primary" size="lg">
          Return to Login
        </Button>
      </Link>
    </div>
  </>
));

export default ForgotPasswordNotification;