import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateBook, getGenre, getAutors } from "../../http/AutorAPI";

const UpdateBookModal = ({ show, onHide, bookData, setBooks }) => {
  const [updatedBookData, setUpdatedBookData] = useState(bookData && bookData.name ? { ...bookData } : {});
  const [authors, setAuthors] = useState();
  const [genres, setGenres] = useState();

  useEffect(() => {
    setUpdatedBookData({ ...bookData });
 getAutors().then(data => setAuthors(data));
 getGenre().then(data => setGenres(data));
    console.log("authors", authors)
    console.log("genres", genres)
  }, [bookData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBookData({
      ...updatedBookData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    setUpdatedBookData({
        ...updatedBookData,
        img: e.target.files[0].name,
      });
      console.log("image", e.target.files[0].name)
  };

  const handleUpdate = async () => {
    try {
      const newBooks = await updateBook(updatedBookData);
      console.log(updatedBookData);
      if(newBooks){
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBookData.id
            ? {
                ...book,
                name: updatedBookData.name,
                description: updatedBookData.description,
                autorId: updatedBookData.autorId,
                genreId: updatedBookData.genreId,
                price: updatedBookData.price,
                img: updatedBookData.img
              }
            : book
        )
      );
      onHide();
    } 
    } catch (error) {
      console.error("Failed to update book", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group controlId="formId">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="number"
                name="id"
                value={updatedBookData.id}
                onChange={handleInputChange}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updatedBookData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescr">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={updatedBookData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
           {authors &&
            <Form.Group controlId="formAutor">
              <Form.Label>autorId</Form.Label>
              <Form.Control
                as="select"
                name="autorId"
                value={updatedBookData.autorId}
                onChange={handleInputChange}
              >
                <option value="">Select Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.id}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            }
            {genres &&
            <Form.Group controlId="formGenre">
              <Form.Label>genreId</Form.Label>
              <Form.Control
                as="select"
                name="genreId"
                value={updatedBookData.genreId}
                onChange={handleInputChange}
              >
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.id}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            }

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={updatedBookData.price}
                onChange={handleInputChange}
              />
            </Form.Group>

          {/* Add other form fields similarly */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateBookModal;
