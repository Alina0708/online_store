import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import ControlAutors from "../components/Admin/ControlAutors";
import { observer } from "mobx-react-lite";


const ControlBooks = observer(() => {

  return (
    <Container>
        <Row>
      <Col md={4}>
        <ControlAutors/>
      </Col>

      <Col md={1}>
       
      </Col>

      <Col md={6}></Col>
      </Row>
    </Container>
  );
});

export default ControlBooks;
