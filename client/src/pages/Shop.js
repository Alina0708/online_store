import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GenreBar from "../components/GenreBar";
import BooksList from "../components/BooksList";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { getAutors, getBooks, getGenre } from "../http/AutorAPI";
import Slider from "../components/Slider";

const Shop = observer(() => {
  const { books } = useContext(Context);

  useEffect(()=> {
    getBooks().then(data => books.setBooks(data));
    getGenre().then(data => books.setGenre(data));
    getAutors().then(data=> books.setAutors(data));
  }, [books]);
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <GenreBar />
        </Col>

        <Col md={9}>
          <Row><Slider/></Row>
          <BooksList />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
