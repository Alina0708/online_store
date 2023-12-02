import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import {
  getOrderBookByUserId,
  getHistoryOrders,
  getStatusNameById,
  delOrderAndOrderBooks,
  changeOrderStatusOnPaid,
} from "../http/AutorAPI";
import { check } from "../http/UserAPI";

const Userorder = observer(() => {
  const [userId, setUser] = useState();
  const [orders, setOrderBook] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cvs, setCvs] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await check();
        setUser(userData.id);
        if (userData.id && userId) {
          getOrderBookByUserId({ userId: userId }).then((orderBook) => {
            setOrderBook(orderBook);
          });
          getHistoryOrders({ userId: userData.id }).then((history) =>
            setHistoryOrders(history)
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (orders.length !== 0) {
      Promise.all(
        orders.map((order) => getStatusNameById({ id: order.statusId }))
      )
        .then((statusList) => {
          const newStatuses = {};
          statusList.forEach((stat, index) => {
            newStatuses[orders[index].id] = stat;
          });
          setStatuses(newStatuses);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId, orders]);

  const calculateTotalCount = (order) => {
    let totalCount = 0;

    order.orderBooks.forEach((book) => {
      totalCount += book.count;
    });

    return totalCount;
  };

  const createPay = ({ orderId }) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const deleteOrderandOrderBook = ({ orderId }) => {
      delOrderAndOrderBooks({ orderId });
      getOrderBookByUserId({ userId: userId }).then((orderBook) => {
        setOrderBook(orderBook);
      });
  };

  const handlePayment = ({ orderId }) => {
    console.log({ orderId });
    if ({ orderId }) {
      const lol = changeOrderStatusOnPaid({ orderId });
      console.log("lol", {lol})
    }

    setShowModal(false);
  };

  return (
    <Container>
      <Row>
        <h3>Current orders</h3>
        {orders.length !== 0 &&
          orders.map((order) => {
            return (
              <Row
                key={order.id}
                style={{
                  borderBottom: "dashed 1px grey",
                  paddingBottom: 20,
                  marginTop: 10,
                }}
              >
                <Col>
                  <Row>
                    {order.orderBooks.map((books) => {
                      return (
                        <div key={books.book.id} className="col-md-3">
                          <Image
                            width={120}
                            height={200}
                            src={"http://localhost:5000/" + books.book.img}
                            alt={books.book.name}
                          />
                          <p>Count: {books.count}</p>
                          <p>Price: {books.book.price} BYN</p>
                        </div>
                      );
                    })}
                  </Row>
                </Col>

                <Col
                  md={3}
                  style={{
                    border: "solid grey 1px",
                    height: 260,
                    marginTop: 40,
                  }}
                >
                  <h4>Order Details</h4>
                  <p>Total Count: {calculateTotalCount(order)}</p>
                  <p>Total Price: {order.commonPrice} BYN</p>
                  <p style={{ color: "#4682B4" }}>
                    Status: {statuses[order.id]}
                  </p>
                  <Button
                    variant="outline-primary"
                    style={{ maxWidth: 285, minWidth: 240 }}
                    onClick={() => {
                      if (statuses[order.id] !== "issued") {
                        return;
                      }
                      createPay({ orderId: order.id });
                     
                    }}
                    disabled={statuses[order.id] !== "issued"} 
                  >
                    Pay
                  </Button>

                  <Button
                    variant="outline-primary"
                    style={{ maxWidth: 285, minWidth: 240, marginTop: 10 }}
                    onClick={() => {
                      if (statuses[order.id] !== "issued") {
                        return; 
                      }
                      deleteOrderandOrderBook({ orderId: order.id });
                    }}
                    disabled={statuses[order.id] !== "issued"} 
                  >
                    Delete order
                  </Button>
                </Col>
              </Row>
            );
          })}

        {orders.length === 0 && (
          <p style={{ color: "grey" }}>You don't have a valid order yet</p>
        )}
      </Row>

      {/* Orders history section */}
      <Row>
        <h3 style={{ marginTop: 20 }}>Orders history</h3>
        {historyOrders.length !== 0 &&
          historyOrders.map((order) => {
            return order.orderBooks.map((books) => {
              return (
                <Row key={books.id} style={{ marginTop: 10 }}>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Image
                      width={120}
                      height={200}
                      style={{ opacity: 0.7 }}
                      src={"http://localhost:5000/" + books.book.img}
                      alt={books.book.name}
                    />
                  </Col>

                  <Col>
                    <h3>{books.book.name}</h3>
                    <p>Count: {books.count}</p>
                    <p>Price: {books.book.price} BYN</p>
                  </Col>
                </Row>
              );
            });
          })}
        {historyOrders.length === 0 && (
          <p style={{ color: "grey" }}>You don't have a paid order yet</p>
        )}
      </Row>

      {/* Payment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment for Order #{selectedOrderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="cardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="cvs">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CVS"
                value={cvs}
                onChange={(e) => setCvs(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handlePayment({ orderId: selectedOrderId });
            }}
          >
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
});

export default Userorder;
