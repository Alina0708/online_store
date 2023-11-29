import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { getBooks, deleteBook } from "../../http/AutorAPI";
import "../../CSS/ControlBookTable.css";
import AddBookModal from "../models/AddBookModal";

const Control = observer(() => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getBooks().then((data) => {
      const sortedBooks = data.sort((a, b) => a.id - b.id);
      setBooks(sortedBooks);
    });
  }, [books.length]);

  const handleAddBookClick = () => {
    setShowModal(true);
  };

  const handleDoubleClick = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this book?" + id
      );
      if (confirmDelete) {
        await deleteBook({id});
        getBooks().then((data) => {
          const sortedBooks = data.sort((a, b) => a.id - b.id);
          setBooks(sortedBooks);
        });
      }
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  return (
    <Container>
      <div style={{ marginBottom: 10 }}>Books</div>
      <Button
        style={{ width: 120, marginBottom: 10, marginLeft: 10, marginTop: 10 }}
        onClick={handleAddBookClick}
      >
        Add book
      </Button>

      <AddBookModal show={showModal} onHide={() => setShowModal(false)} />
      <table className="custom-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Autor</th>
            <th>Genre</th>
            <th>Rate</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={index}
              className="custom-table-row"
              onMouseOut={(e) => (e.target.style.backgroundColor = "inherit")}
              onDoubleClick={() => handleDoubleClick(book.id)}
            >
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>
                <img
                  src={"http://localhost:5000/" + book.img}
                  alt="Book cover"
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>{book.description}</td>
              <td>{book.autorId}</td>
              <td>{book.genreId}</td>
              <td>{book.rating}</td>
              <td>{book.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
});

export default Control;
