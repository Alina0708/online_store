import React, {useState, useEffect} from "react";
import { Col, Container, Row } from "react-bootstrap";
import ControlAutors from "../components/Admin/ControlAutors";
import { observer } from "mobx-react-lite";
import ControlGenre from "../components/Admin/ControlGenre";
import Control from "../components/Admin/Control"
import "../CSS/ControlBookTable.css";
import { getAutors, getGenre } from "../http/AutorAPI";

const ControlBooks = observer(() => {
  const [genres, setGenres] = useState([])
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    getGenre().then(data => setGenres(data));
    getAutors().then(data => setAuthors(data))
  }, [])

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Row>
            <ControlAutors authors={authors} setAuthors={setAuthors} />
          </Row>
          <Row>
            <ControlGenre genres={genres} setGenres={setGenres}/>
          </Row>
        </Col>

        <Col md={8}>
          <Control genres={genres} authors={authors}/>
        </Col>
      </Row>
    </Container>
  );
});

export default ControlBooks;
