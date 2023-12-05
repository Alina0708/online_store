import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Form, Carousel } from "react-bootstrap";
import GenreBar from "../components/GenreBar";
import BooksList from "../components/BooksList";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { getAutors, getBooks, getGenre } from "../http/AutorAPI";
import Slider from "../components/Slider";
import { findBooksByAuthorOrName } from "../http/AutorAPI";
import BookCard from "../components/BookCard";
import "../CSS/pageShop.css"

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
    console.log("lol", searchQueryValue)
    if(searchQueryValue !== " " && searchQueryValue !== ""){
    findBooksByAuthorOrName({ bookOrAuthor: searchQueryValue }).then((data) => {
      setSearchBook(data.books);
    });
  }
  };
  const filteredBooks = books.books.filter((book) => {
    const createdDate = new Date(book.createdAt);
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    return createdDate > oneWeekAgo;});

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
          
          <Row className="carousel-row" style={{marginTop:10}}>
            <div className="carousel-wrapper">
              <p>New books</p>
              <Carousel indicators={false} interval={null} style={{ height: "400px", overflow: "hidden"}}>
                {[...Array(Math.ceil(filteredBooks.length / 4))].map((_, index) => (
                  <Carousel.Item key={index}>
                    <Row>
                      {filteredBooks.slice(index * 4, index * 4 + 4).map((book) => (
                        <Col key={book.id} md={3}>
                          <BookCard bookitem={book} />
                        </Col>
                      ))}
                    </Row>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
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
