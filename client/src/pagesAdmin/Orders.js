import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Container, Row, Form, Tab, Tabs } from "react-bootstrap";
import { getUserOrdersSatatus, getAllStatus, changeOrderStatus, getUserOrdersSatatusCompleted } from "../http/AutorAPI";
import "../CSS/ControlOrderTable.css";

const Orders = observer(() => {
  const [userOrders, setUserOrders] = useState();
  const [userOrders2, setUserOrders2] = useState();
  const [orderStatus, setStatus] = useState();

  useEffect(() => {
    getUserOrdersSatatus().then((data) => setUserOrders(data));
    getAllStatus().then((data) => {
      setStatus(data);
    });
    getUserOrdersSatatusCompleted().then((data)=>setUserOrders2(data))
  }, []);

  const handleStatusChange = ({ orderId }) => (e) => {
    const statusName = e.target.value;
    changeOrderStatus({ orderId: orderId, statusName: statusName })
      .then(() => {
        getUserOrdersSatatus().then((data) => setUserOrders(data));
        getUserOrdersSatatusCompleted().then((data)=>setUserOrders2(data))
      })
      .catch((error) => console.error("Error updating order status:", error));
  };

  const isPaidAndOneDayPassed = (createdAt, status) => {
    const oneDayInMillis = 24 * 60 * 60 * 1000; // milliseconds in a day
    const currentTime = new Date().getTime();
    const orderTime = new Date(createdAt).getTime();

    return status === "paid" && currentTime - orderTime >= oneDayInMillis;
  };

  return (
    <Container>
      <Row>
        <Tabs defaultActiveKey="current" id="orders-tabs">
          <Tab eventKey="current" title="Current orders">
            <h3>History orders</h3>
            {userOrders &&
              userOrders.map((userorder) => {
                return (
                  <div key={userorder.user.id}>
                    <h5>{userorder.user.email}</h5>
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Date</th>
                          <th>Book id</th>
                          <th>Count</th>
                          <th>Image</th>
                          <th>Status</th>
                          <th>Common Price (BYN)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userorder.orders &&
                          userorder.orders.map((order) => {
                            const createdAtDate = new Date(order.createdAt);
                            const isOverOneDay = isPaidAndOneDayPassed(order.createdAt, order.status);

                            return (
                              <tr
                                key={order.orderId}
                                style={{
                                  textDecoration: isOverOneDay ? "underline" : "none",
                                  color: isOverOneDay ? "lightcoral" : "inherit",
                                }}
                              >
                                <td className="numberOrder">#{order.orderId}</td>
                                <td className="dateOrder">
                                  {createdAtDate.toDateString()}
                                  <br />
                                  {createdAtDate.toTimeString().split(" ")[0]}
                                </td>
                                <td className="bookOrder">
                                  {order.books.map((book, index) => (
                                    <div key={`book_${book.bookId}_${index}_${order.orderId}`}>
                                      <span>{book.bookId}</span>
                                      <br />
                                    </div>
                                  ))}
                                </td>
                                <td className="countOrder">
                                  {order.books.map((book, index) => (
                                    <div key={`count_${book.count}_${index}_${order.orderId}`}>
                                      <span>{book.count}</span>
                                      <br />
                                    </div>
                                  ))}
                                </td>
                                <td className="orderImage">
                                  {order.books.map((book, index) => (
                                    <img
                                      key={`image_${book.bookId}_${book.image}_${index}_${order.orderId}`}
                                      src={`http://localhost:5000/${book.image}`}
                                      alt="Book cover"
                                      style={{ width: "90px", height: "auto", marginRight: 6 }}
                                    />
                                  ))}
                                </td>
                                <td className="orderStatus">
                                  <Form.Select
                                    value={order.status}
                                    onChange={handleStatusChange({ orderId: order.orderId })}
                                  >
                                    {orderStatus &&
                                      orderStatus
                                        .slice(
                                          orderStatus.findIndex(
                                            (status) => status.name === order.status
                                          ),
                                          orderStatus.length
                                        )
                                        .map((status, index) => (
                                          <option key={status.id} value={status.name}>
                                            {status.name}
                                          </option>
                                        ))}
                                  </Form.Select>
                                </td>
                                <td>{order.commonPrice}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                );
              })}
          </Tab>

          <Tab eventKey="history" title="History orders">
            <h3>History orders</h3>
            {userOrders2 &&
              userOrders2.map((userorder) => {
                return (
                  <div key={userorder.user.id}>
                    <h5>{userorder.user.email}</h5>
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Date</th>
                          <th>Book id</th>
                          <th>Count</th>
                          <th>Image</th>
                          <th>Status</th>
                          <th>Common Price (BYN)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userorder.orders &&
                          userorder.orders.map((order) => {
                            const createdAtDate = new Date(order.createdAt);
                            const isOverOneDay = isPaidAndOneDayPassed(order.createdAt, order.status);

                            return (
                              <tr
                                key={order.orderId}
                                style={{
                                  textDecoration: isOverOneDay ? "underline" : "none",
                                  color: isOverOneDay ? "lightcoral" : "inherit",
                                }}
                              >
                                <td className="numberOrder">#{order.orderId}</td>
                                <td className="dateOrder">
                                  {createdAtDate.toDateString()}
                                  <br />
                                  {createdAtDate.toTimeString().split(" ")[0]}
                                </td>
                                <td className="bookOrder">
                                  {order.books.map((book, index) => (
                                    <div key={`book_${book.bookId}_${index}_${order.orderId}`}>
                                      <span>{book.bookId}</span>
                                      <br />
                                    </div>
                                  ))}
                                </td>
                                <td className="countOrder">
                                  {order.books.map((book, index) => (
                                    <div key={`count_${book.count}_${index}_${order.orderId}`}>
                                      <span>{book.count}</span>
                                      <br />
                                    </div>
                                  ))}
                                </td>
                                <td className="orderImage">
                                  {order.books.map((book, index) => (
                                    <img
                                      key={`image_${book.bookId}_${book.image}_${index}_${order.orderId}`}
                                      src={`http://localhost:5000/${book.image}`}
                                      alt="Book cover"
                                      style={{ width: "90px", height: "auto", marginRight: 6 }}
                                    />
                                  ))}
                                </td>
                                <td className="orderStatus">
                                  <Form.Select
                                    value={order.status}
                                    onChange={handleStatusChange({ orderId: order.orderId })}
                                  >
                                    {orderStatus &&
                                      orderStatus
                                        .slice(
                                          orderStatus.findIndex(
                                            (status) => status.name === order.status
                                          ),
                                          orderStatus.length
                                        )
                                        .map((status, index) => (
                                          <option key={status.id} value={status.name}>
                                            {status.name}
                                          </option>
                                        ))}
                                  </Form.Select>
                                </td>
                                <td>{order.commonPrice}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                );
              })}
          </Tab>

        </Tabs>
      </Row>
    </Container>
  );
});

export default Orders;
