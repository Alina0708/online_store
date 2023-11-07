import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GenreBar from "../components/GenreBar";
import AutorsBar from "../components/AutorsBar";
import BooksList from "../components/BooksList";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { getAutors, getBooks, getGenre } from "../http/AutorAPI";

const Shop = observer(() => {
  const { books } = useContext(Context);

  useEffect(()=> {
    getBooks().then(data => books.setBooks(data));
    getGenre().then(data => books.setGenre(data));
    getAutors().then(data=> books.setAutors(data));
  }, []);
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <GenreBar />
          <AutorsBar />
        </Col>

        <Col md={9}>
          <BooksList />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
