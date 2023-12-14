import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  Button,
  Modal,
  Form 
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
  const [showModal, setShowModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cvs, setCvs] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    cardNumber: false,
    cvs: false,
    expiryDate: false,
  });

  console.log('statuses', statuses)

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
  }, [userId, orders, statuses[orders]]);

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
    console.log('orderId', orderId, {...statuses, [orderId]: 'paid'})
    if ({ orderId }) {
     changeOrderStatusOnPaid({ orderId }).then(data=> {setStatuses({...statuses, [orderId]: data.status})});
    }
    // setShowModal(false);
  };

  const handlePayClick = () => {
    const cardNumberValid = cardNumber.length === 16;
    const cvsValid = cvs.length === 3;
    const expiryDateValid = expiryDate.length === 5;

    if (cardNumberValid && cvsValid && expiryDateValid) {
      handlePayment({ orderId: selectedOrderId });
      setShowModal(false);
    } else {
      setValidationErrors({
        cardNumber: !cardNumberValid,
        cvs: !cvsValid,
        expiryDate: !expiryDateValid,
      });
      console.log('Please fill in all fields correctly.');
      // Implement logic to display an error message or handle invalid inputs
    }
  };

  const handleExpiryDateChange = (e) => {
    const input = e.target.value;
    let formattedInput = input.replace(/\D/g, ''); // Удаляем все нецифровые символы из введенной строки
    
    let month = formattedInput.slice(0, 2);
    let year = formattedInput.slice(2);

    // Определение текущего года
    const currentYear = new Date().getFullYear().toString().slice(2);

    // Проверка месяца: от 01 до 12
    if (parseInt(month, 10) > 12 || parseInt(month, 10) < 1) {
        console.error('Invalid month');
        // Обведение поля красным
        e.target.style.borderColor = 'red';
        // Вывод предупреждения
        alert('Месяц должен быть в промежутке от 01 до 12');
        return;
    } else {
        e.target.style.borderColor = ''; // Сброс красной рамки, если месяц валидный
    }
    

    if ((year.length === 2 && parseInt(year, 10) < currentYear) || (year.length === 2 && parseInt(year, 10) > parseInt(currentYear, 10) + 4)) {
        console.error('Invalid year');
        // Обведение поля красным
        e.target.style.borderColor = 'red';
        // Вывод предупреждения
        alert(`Год должен быть в промежутке от ${currentYear} до ${parseInt(currentYear, 10) + 4}`);
        return;
    } else {
        e.target.style.borderColor = ''; // Сброс красной рамки, если год валидный
    }

    formattedInput = `${month}/${year}`;
    setExpiryDate(formattedInput);
};
  
  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    const formattedInput = input.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
    setCardNumber(formattedInput);
  };

  const handleCvsChange = (e) => {
    const input = e.target.value;
    const formattedInput = input.replace(/\s/g, '').replace(/\D/g, '').slice(0, 3);
    setCvs(formattedInput);
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
                    style={{ maxWidth: 285, minWidth: 240, opacity: statuses[order.id] !== 'issued' ? 0.4 : 1,}}
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
              onChange={handleCardNumberChange}
              maxLength={16}
              style={{ borderColor: validationErrors.cardNumber ? 'red' : '' }}
            />
            {validationErrors.cardNumber && (
              <Form.Text style={{ color: 'red' }}>Please enter a valid card number</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="expiryDate">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              maxLength={5}
              style={{ borderColor: validationErrors.expiryDate ? 'red' : '' }}
            />
            {validationErrors.expiryDate && (
              <Form.Text style={{ color: 'red' }}>Please enter a valid expiration date</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="cvs">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter CVS"
              value={cvs}
              onChange={handleCvsChange}
              maxLength={3}
              style={{ borderColor: validationErrors.cvs ? 'red' : '' }}
            />
            {validationErrors.cvs && (
              <Form.Text style={{ color: 'red' }}>Please enter a valid CVS</Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePayClick}>
          Pay
        </Button>
      </Modal.Footer>
    </Modal>
    </Container>
  );
});

export default Userorder;
