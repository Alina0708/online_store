import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ControlAutors from "../components/Admin/ControlAutors";
import { observer } from "mobx-react-lite";
import ControlGenre from "../components/Admin/ControlGenre";
import Control from "../components/Admin/Control"
import "../CSS/ControlBookTable.css";

const ControlBooks = observer(() => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Row>
            <ControlAutors />
          </Row>
          <Row>
            <ControlGenre/>
          </Row>
        </Col>

        <Col md={8}>
          <Control/>
        </Col>
      </Row>
    </Container>
  );
});

export default ControlBooks;
