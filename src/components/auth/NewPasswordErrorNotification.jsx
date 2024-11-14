import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "react-bootstrap";

const NewPasswordErrorNotification = React.memo((props) => (
  <>
    <Helmet title="New Password" />
    <div className="text-center">
      <h2>New Password!</h2>
      <p className="lead fw-normal mt-3 mb-4 text-danger">
        Cannot found username from token.
      </p>
      <Link to="/auth/sign-in">
        <Button variant="primary" size="lg">
          Return to Login
        </Button>
      </Link>
    </div>
  </>
));

export default NewPasswordErrorNotification;