import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Row } from "react-bootstrap";

const Home = () => (
  <React.Fragment>
    <Helmet title="Home" />
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Home Page</h1>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">Home Page</Card.Title>
            </Card.Header>
            <Card.Body>&nbsp;</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);

export default Home;
