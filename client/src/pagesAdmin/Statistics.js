import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import {
  getBooks,
  getPopularBookInOrders,
  getOrders,
  getGenreCount,
} from "../http/AutorAPI";
import { Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Chart from "chart.js/auto";
import "../CSS/CircularProgressWithText.css";

const Statistics = observer(() => {
  const [books, setBooks] = useState([]);
  const [bookOrders, setOrderData] = useState([]);
  const [orderData, setOrder] = useState([]);
  const [booksCount, setBooksCount] = useState([]);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
    getPopularBookInOrders().then((data) => setOrderData(data));
    getOrders().then((data) => setOrder(data));
    getGenreCount().then((data) => setBooksCount(data));
  }, []);
  //console.log("booksCount", orderData)
  console.log("bookOrders", bookOrders);

  //1
  const totalBooks = books.length;
  const totalRating = books.reduce((total, book) => total + book.rating, 0);
  const averageRating = totalRating / totalBooks;
  //2

  const data = {
    labels: books.map((book) => book.id),
    datasets: [
      {
        label: "Book Ratings",
        data: books.map((book) => book.rating),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
        },
        title: {
          display: true,
          text: "Book ID", // Название оси X
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Rating", // Название оси Y
        },
      },
    },
  };

  useEffect(() => {
    try {
      const chart = new Chart(document.getElementById("popularity-chart"), {
        type: "bar",
        data: data,
        options: options,
      });
      return () => chart.destroy();
    } catch (e) {
      return <p>Loading ...</p>;
    }
  }, [books]);

  //3
  useEffect(() => {
    try {
      if (bookOrders.length > 0) {
        const bookData = bookOrders.map((order) => ({
          name: order.name,
          rating: order.rating,
        }));

        const sortedBooks = bookData.sort((a, b) => b.rating - a.rating);

        const labels = sortedBooks.map((book) => book.name);
        const dataValues = sortedBooks.map((book) => book.rating);

        const ctx = document.getElementById("books-orders-chart");
        if (ctx) {
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Book rate",
                  data: dataValues,
                  backgroundColor: "rgba(221, 160, 221, 0.2)",
                  borderColor: "rgba(221, 160, 221, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              indexAxis: "y",
              scales: {
                x: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Orders Count",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Books",
                  },
                },
              },
            },
          });
        }
      }
    } catch (e) {
      return <p>Loading ...</p>;
    }
  }, [bookOrders]);

  //4
  useEffect(() => {
    try {
      if (orderData.length > 0) {
        const dailyRevenueMap = new Map();
        orderData.forEach((order) => {
          const date = new Date(order.createdAt).toLocaleDateString();
          const revenue = +order.commonPrice;

          if (dailyRevenueMap.has(date)) {
            dailyRevenueMap.set(date, dailyRevenueMap.get(date) + revenue);
          } else {
            dailyRevenueMap.set(date, revenue);
          }
        });

        const dates = [...dailyRevenueMap.keys()];
        const revenues = [...dailyRevenueMap.values()];

        const ctx = document.getElementById("daily-revenue-chart");
        if (ctx) {
          new Chart(ctx, {
            type: "line",
            data: {
              labels: dates,
              datasets: [
                {
                  label: "Daily Revenue",
                  data: revenues,
                  borderColor: "rgba(0, 128, 0, 1)",
                  borderWidth: 1,
                  fill: false,
                },
              ],
            },
            options: {
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Date",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Revenue",
                  },
                },
              },
            },
          });
        }
      }
    } catch (e) {
      return <p>Loading ...</p>;
    }
  }, [orderData]);

  //5
  const chartRef = useRef(null);

  const calculatePercentageByDay = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const ordersPerDay = {};

    orderData.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const dayOfWeek = daysOfWeek[orderDate.getDay()];

      if (ordersPerDay[dayOfWeek]) {
        ordersPerDay[dayOfWeek]++;
      } else {
        ordersPerDay[dayOfWeek] = 1;
      }
    });

    const totalOrders = orderData.length;

    const dataLabels = Object.keys(ordersPerDay);
    const dataValues = dataLabels.map((day) =>
      ((ordersPerDay[day] / totalOrders) * 100).toFixed(2)
    );

    displayChart(dataLabels, dataValues);
  };

  const displayChart = (labels, data) => {
    const ctx = document.getElementById("orderChart").getContext("2d");

    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Order Percentage by Day",
            data: data,
            backgroundColor: [
              "#aee5b0", //green -
              "#f6f79e", //red  -
              "#afd8db", //blue -
              "#bf8ab6", //pink -
              "#f79eda", //orange
              "#eda1b3",
              "#848aa1",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              const total = ctx.chart.data.datasets[0].data.reduce(
                (acc, val) => acc + val,
                0
              );
              const percentage = ((value / total) * 100).toFixed(2);
              return `Segment\n${percentage}%`;
            },
            color: "#fff",
            font: {
              weight: "bold",
            },
            display: true,
          },
        },
      },
    });
  };
  useEffect(() => {
    if (orderData.length > 0) {
      calculatePercentageByDay();
    }
  }, [orderData]);

  return (
    <Container>
      <Row style={{ marginTop: 20 }}>
        <Col
          md={2}
          style={{
            border: "solid #D3D3D3 1px",
            margin: 10,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p>Total books: {totalBooks}</p>
          <p>Average rating: {averageRating}</p>

          <div style={{ width: "200px", height: "200px" }}>
            <CircularProgressbar
              value={averageRating}
              text={`${averageRating.toFixed(1)}/5`} // Значение рейтинга с одной десятичной
              strokeWidth={13} // Толщина обводки
              styles={buildStyles({
                strokeLinecap: "square", // Стиль завершения линии (можно использовать 'butt', 'round' или 'square')
                textSize: "16px", // Размер текста
                pathColor: `rgba(82, 150, 210, ${averageRating / 5})`, // Цвет диаграммы
                textColor: "#f88", // Цвет текста
                trailColor: "#d6d6d6", // Цвет фона диаграммы
              })}
              className="circular-progressbar-text"
            />
          </div>
          <strong
            style={{
              marginTop: "10",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Average Rating
          </strong>
        </Col>
        <Col md={4} style={{ border: "solid #D3D3D3 1px", margin: 10 }}>
          <p>Total books: {books.length}</p>
          <div style={{ height: "300px", width: "400" }}>
            <canvas id="popularity-chart"></canvas>
          </div>
        </Col>
        <Col md={5} style={{ border: "solid #D3D3D3 1px", margin: 10 }}>
          <p>Top Ordered Books</p>
          <div style={{ height: "300px" }}>
            <canvas id="books-orders-chart"></canvas>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          md={6}
          style={{
            border: "solid #D3D3D3 1px",
            margin: 10,
          }}
        >
          <p>Daily revenue</p>
          <div style={{ height: "400px", width: "650px" }}>
            <canvas id="daily-revenue-chart"></canvas>
          </div>
        </Col>
        <Col
          md={3}
          style={{
            border: "solid #D3D3D3 1px",
            margin: 10,
          }}
        >
          {" "}
          <p>Order Percentage by Day</p>
          <canvas id="orderChart" width="500" height="400"></canvas>
        </Col>
        <Col
          md={2}
          style={{
            border: "solid #D3D3D3 1px",
            margin: 10,
          }}
        >
          <p>Number of books of each genre</p>
          {booksCount &&
            Object.keys(booksCount).map((genre) => (
              <Row key={genre}>
                <Col style={{ fontSize: 14 }}>{genre}</Col>
                <Col style={{ textAlign: "right" }}>{booksCount[genre]}</Col>
              </Row>
            ))}
        </Col>
      </Row>
    </Container>
  );
});

export default Statistics;
