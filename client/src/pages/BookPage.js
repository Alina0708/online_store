import React, {useState} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from "../image/pngwing.com.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getBookOneId, getGenreDescription } from "../http/AutorAPI";
import {check} from "../http/UserAPI";

const BookPage = () => {
  const[books, setBooks] = useState({info:[]})
  const[userId, setUser] = useState();
  const[descriptionGenre, setDescriptionGenre] = useState("");
  const {id} = useParams();
  let comment;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await getBookOneId(id);
        setBooks(bookData);

        const genreDescription = await getGenreDescription(bookData.genre);
        setDescriptionGenre(genreDescription);
        
        const userData = await check();
        setUser(userData.id);
        
        console.log("lol", userId, id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, userId]);


  

  const handleSendComment = () => {
    if (comment.trim() !== "") {
      comment = "";
    }
  };

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
          <p  style={{paddingTop:45}}>{books.description}</p>
          <h2>Characteristic</h2>
          <div className="d-flex align-item-center mt-1">
            <p>Autor: {books.author}</p>
               </div>
          <div className="d-flex align-item-center mt-1">
            <p>Genre: {books.genre} </p>
          </div>
          <div className="d-flex align-item-center mt-1">
            <p>*{descriptionGenre}</p>
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
        <div>
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            style={{height:100}}
            className="d-block w-100"
          />
          <Button onClick={handleSendComment} style={{position:"absolute", right: 320, marginTop: 10, width: 200}}>
            Send
          </Button>
        </div>
        
      </Row>

    </Container>
  );
};

export default BookPage;
