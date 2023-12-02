import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import GenreBar from "../components/GenreBar";
import BooksList from "../components/BooksList";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { getAutors, getBooks, getGenre } from "../http/AutorAPI";
import Slider from "../components/Slider";
import { findBooksByAuthorOrName } from "../http/AutorAPI";
import BookCard from "../components/BookCard";

const Shop = observer(() => {
  const { books } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBook, setSearchBook] = useState([]);

  useEffect(() => {
    getBooks().then((data) => books.setBooks(data));
    getGenre().then((data) => books.setGenre(data));
    getAutors().then((data) => books.setAutors(data));
  }, [books]);
  
  const handleSearch = (searchQueryValue) => {
    if(searchQueryValue !== " " && searchQueryValue !== ""){
    findBooksByAuthorOrName({ bookOrAuthor: searchQueryValue }).then((data) => {
      setSearchBook(data.books);
    });
  }
  };

  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Col md={9}>
          <Row>
            <GenreBar />
          </Row>

          <Row style={{ marginBottom: 10, marginTop: 10 }}>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search by book title or author"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
            </Col>
          </Row>

          <Row>
            <Slider />
          </Row>
          {searchBook.length === 0 && searchQuery !== "" && (
            <p
              style={{
                marginTop: 50,
                textAlign: "center",
                color: "grey",
                fontSize: 18,
              }}
            >
              Nothing was found for your request
            </p>
          )}
          {(searchBook.length === 0 && searchQuery === "") && books.books?.length > 0 && <BooksList />}
          {searchBook.length !== 0 && searchQuery !== "" && (
            <Row className="d-flex">
              {searchBook.map((book) => (
                <BookCard key={book.id} bookitem={book} />
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
