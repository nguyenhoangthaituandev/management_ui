import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "react-bootstrap";

const Page403 = () => (
  <>
    <Helmet title="403 Error" />
    <div className="text-center">
      <h1 className="display-1 fw-bold">403</h1>
      <p className="h2">Access is denied!</p>
      <p className="lead fw-normal mt-3 mb-4">
        You don't have permissions to access this page. Please contact admin.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Return to website
        </Button>
      </Link>
    </div>
  </>
);

export default Page403;
