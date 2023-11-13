import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { check } from "../http/UserAPI";
import {
  getBasketBooksByUserId,
  increaseCount,
  decreaseCount,
  deleteBasketBooksByUserByBook,
} from "../http/AutorAPI";
import { Image } from "react-bootstrap";
import emptyBasket from "../image/empty-cart.png";

const Basket = observer(() => {
  const [userId, setUser] = useState();
  const [BasketBooks, setBasketBooks] = useState([]);
  const [counts, setCount] = useState(); //
  const [totalCounts, setTotalCounts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  let bookId;
  let basketId = userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await check();
        setUser(userData.id);

        if (userId) {
          await getBasketBooksByUserId(userId).then((data) => {
            setBasketBooks(data.basketBooks);

            let totalCounts = data.basketBooks.reduce(
              (sum, item) => sum + item.count,
              0
            );
            let totalPrice = data.basketBooks.reduce(
              (sum, item) => sum + item.count * item.book.price,
              0
            );

            setTotalCounts(totalCounts);
            setTotalPrice(totalPrice);
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId, counts, BasketBooks]);

  const handleIncrement = async (bookId) => {
    let sumCount = await increaseCount(bookId);
    setCount(sumCount.counts);
  };

  const handleDecrement = async ({ basketUser }, bookId) => {
    if (basketUser.count > 1) {
      let sumCount = await decreaseCount(bookId);
      setCount(sumCount.counts);
    }
  };

  const deleteBook = (basketId, bookId) => {
    console.log(basketId, bookId);
    if (basketId && bookId) {
      deleteBasketBooksByUserByBook({ basketId, bookId })
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          {BasketBooks &&
            BasketBooks.map((basketUser) => {
              return (
                <Row key={basketUser.id} style={{ paddingTop: 20 }}>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Image
                      width={170}
                      height={250}
                      src={"http://localhost:5000/" + basketUser.book.img}
                    />
                  </Col>
                  <Col>
                    <h4>{basketUser.book.name}</h4>
                    <p>{basketUser.book.description}</p>
                  </Col>
                  <Col>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        onClick={() => {
                          bookId = basketUser.book.id;
                          handleDecrement({ basketUser }, bookId);
                        }}
                      >
                        -
                      </Button>

                      <input
                        style={{
                          height: 35,
                          width: 100,
                          marginLeft: 5,
                          marginRight: 5,
                          textAlign: "center",
                        }}
                        type="text"
                        value={counts ? basketUser.count : basketUser.count}
                        readOnly
                      />
                      <Button
                        onClick={() => {
                          bookId = basketUser.book.id;
                          handleIncrement(bookId);
                        }}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="outline-primary"
                      style={{ width: 180, marginTop: 10 }}
                      onClick={() => {
                        const bookId = basketUser.book.id;
                        deleteBook(basketId, bookId);
                      }}
                    >
                      Delete
                    </Button>
                    <p style={{ paddingTop: 20 }}>
                      Price: {basketUser.count * basketUser.book.price}
                    </p>
                  </Col>
                </Row>
              );
            })}
        </Col>

        {BasketBooks.length !== 0 && (
          <Col md={3} style={{ paddingTop: 20 }}>
            <div style={{ border: "solid grey 1px", padding: 10, width: 260 }}>
              <p>Total Count: {totalCounts}</p>
              <p>Total Price: {totalPrice}</p>
              <Button
                variant="outline-primary"
                style={{ maxWidth: 285, minWidth: 240 }}
              >
                Place an order
              </Button>
            </div>
          </Col>
        )}
      </Row>

      {BasketBooks.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image height={300} src={emptyBasket} alt="..." />
          <h2>There is nothing in the cart</h2>
          <p
            style={{
              color: "grey",
              fontSize: 28,
              width: 450,
              textAlign: "center",
            }}
          >
            Use search or go to the catalog to find interesting products
          </p>
        </div>
      )}
    </Container>
  );
});

export default Basket;
