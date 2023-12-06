import React, { useState, useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from "../image/pngwing.com.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getBookOneId,
  getCommentsBook,
  getGenreDescription,
  createComments,
  getBasketIdByUserId,
  createBasketBook,
  createRate,
  getRateByUser
} from "../http/AutorAPI";
import { check } from "../http/UserAPI";
import { Context } from "../index";

const BookPage = () => {
  const [books, setBooks] = useState({ info: [] });
  const [userId, setUser] = useState();
  const [showComments, setShowComment] = useState([]);
  let [comment, setCommnet] = useState("");
  const [descriptionGenre, setDescriptionGenre] = useState("");
  const [basket, setBasket] = useState();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
const [rate, setRate] = useState();

const { isAuth } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await getBookOneId(id);
        setBooks(bookData);

        const genreDescription = await getGenreDescription({name:bookData.genre});
        setDescriptionGenre(genreDescription);

        if(isAuth.isAuth){
        const userData = await check();
        setUser(userData.id);
        if(userId && id)
        { 
        getRateByUser({ userId, bookId: parseInt(id, 10) }).then(data => {setRate(data.rate);});
        }
      }

        const showComment = await getCommentsBook(id);
        setShowComment(showComment.comments);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, showComments?.length, comment, rating, userId]);

  const handleSendComment = async () => {
    try {
      if (userId && id && comment !== "") {
        let data = await createComments({ comment, userId, bookId: id });
        console.log("Comment added successfully");
        if (data) {
          setCommnet("");
          //setShowComment([...showComments, {comment:comment, userId:userId, bookId: id}]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const AddToBasket = async () => {
    if (userId) {
      await getBasketIdByUserId({ userId }).then((data) => setBasket(data));
      if (basket) {
        let basketId = basket.basket.id;
        console.log(basketId);
        await createBasketBook({ basketId: basketId, bookId: id });
        window.alert("successful add book");
      }
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => setRating(i)}
          onMouseLeave={() => setRating(0)}
          style={{
            cursor: 'pointer',
            fontSize: '28px', 
            color: (rate === 0 && i <= rating) || (i <= rate) ? 'gold' : 'gray'

          }}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const handleStarClick = (star) => {
    setRating(star);
    console.log({rate:star, userId, id})
    createRate({rate:star, userId, bookId:id})
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={400}
            src={"http://localhost:5000/" + books.img}
          />
          <Row>
            <div
              style={{ height: 20 }}
              className="d-flex mt-1"
            >
              <div style={{display:"flex"}}>
              <p>{books.rating}</p>
              <Image src={star} width={20} height={20} />
              </div>
             {isAuth.isAuth  && <div style={{display:"flex", alignItems:"center", marginLeft: 140}}> {renderStars()}</div>}
            </div>
          </Row>
        </Col>
        <Col md={5}>
          <h2 style={{ height: 20 }}>{books.name}</h2>
          <p style={{ paddingTop: 45 }}>{books.description}</p>
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
        {isAuth.isAuth  && 
        <Col md={3}>
          <div style={{ border: "1px solid black", padding: 20 }}>
            <div className="d-flex">
              <p>Price:</p>
              <p>{" " + books.price + "BYN"}</p>
            </div>
            <div>
              <Button variant="outline-primary" onClick={AddToBasket}>
                Add to Basket
              </Button>
            </div>
          </div>
        </Col>}
      </Row>

      <Row>
      {isAuth.isAuth  && <h3 className="d-flex align-item-center mt-1">Comments</h3>}
        {isAuth.isAuth  && 
        <div>
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setCommnet(e.target.value)}
            style={{ height: 100 }}
            className="d-block w-100"
          />
          <Button
            onClick={handleSendComment}
            style={{
              position: "absolute",
              right: 310,
              marginTop: 10,
              width: 200,
            }}
          >
            Send
          </Button>
        </div>}

        <div style={{ marginTop: 70 }}>
          {showComments &&
            showComments.map((data, index) => {
              return (
                <ul key={index}>
                  <li style={{ paddingTop: 20 }} key={`comment-${index}`}>
                    {data.comment}
                  </li>
                  <p
                    style={{
                      position: "absolute",
                      right: 250,
                      width: 200,
                    }}
                    key={`user-${index}`}
                  >
                    {data.user.email}
                  </p>
                </ul>
              );
            })}
        </div>
      </Row>
    </Container>
  );
};

export default BookPage;
