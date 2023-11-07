import React, {useState} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from "../image/pngwing.com.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getBookOneId } from "../http/AutorAPI";

const BookPage = () => {
  const[books, setBooks] = useState({info:[]})
  const {id} = useParams();
  useEffect(() => {
    getBookOneId(id).then(data => setBooks(data));
  }, [id])
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={400} src={"http://localhost:5000/" + books.img} />
          <Row>
            <div style={{height:20}} className="d-flex align-item-center mt-1">
              <p>{books.rating}</p>
              <Image src={star} width={20} height={20} />
            </div>
          </Row>
        </Col>
        <Col md={5}>
          <h2 style={{height:20}}>{books.name}</h2>
          <p>{books.description}</p>
          <h2>Characteristic</h2>
          <div className="d-flex align-item-center mt-1">
            <p>Autor: {books.author}</p>
               </div>
          <div className="d-flex align-item-center mt-1">
            <p>Genre: {books.genre}</p>
           
          </div>
        </Col>
        <Col md={3}>
          <div style={{ border: "1px solid black", padding: 20 }}>
            <div className="d-flex">
              <p>Price:</p>
              <p>{" " + books.price + "BYN"}</p>
            </div>
            <div>
              <Button variant="outline-primary">Add to Basket</Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <h3 className="d-flex align-item-center mt-1">Comments</h3>
      </Row>
    </Container>
  );
};

export default BookPage;
