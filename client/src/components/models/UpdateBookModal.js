import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { updateBook, getAutors } from "../../http/AutorAPI";

const UpdateBookModal = ({ show, onHide, bookData, setBooks, updateBooksList, genres, authors }) => {
  const [updatedBookData, setUpdatedBookData] = useState(
    bookData && bookData.name ? { ...bookData } : {}
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUpdatedBookData({ ...bookData });
  }, [bookData]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBookData({
      ...updatedBookData,
      [name]: value,
    });
  
    const updatedErrors = { ...errors };
  
    if (name === 'name' && value.trim() !== '') {
      delete updatedErrors.name;
    } else if (name === 'description' && value.trim() !== '') {
      delete updatedErrors.description;
    } else if (name === 'autorId' && value.trim() !== '') {
      delete updatedErrors.autorId;
    } else if (name === 'genreId' && value.trim() !== '') {
      delete updatedErrors.genreId;
    } else if (name === 'price' && (!isNaN(value) && parseFloat(value) >= 0)) {
      delete updatedErrors.price;
    }
  
    setErrors(updatedErrors);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (extension !== "jpg") {
        setErrors({ ...errors, image: "Please select a JPG image" });
      } else {
        setUpdatedBookData({
          ...updatedBookData,
          img: file
        });
        setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const validationErrors = validateForm(updatedBookData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        const newBooks = await updateBook(updatedBookData);
        console.log(newBooks);
        if (newBooks) {
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
                    img: updatedBookData.img,
                  }
                : book
            )
          );
          onHide();
          updateBooksList();
        }
      }
    } catch (error) {
      console.error("Failed to update book", error);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.name) {
      errors.name = "Please enter a name";
    }

    if (!data.description) {
      errors.description = "Please enter a description";
    }

    if (!data.autorId) {
      errors.autorId = "Please select an author";
    }

    if (!data.genreId) {
      errors.genreId = "Please select a genre";
    }

    if (!data.price || data.price < 0) {
      errors.price = "Price must be a non-negative number";
    }

    return errors;
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
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleImageChange}
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDescr">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={updatedBookData.description}
              onChange={handleInputChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          {authors && (
            <Form.Group controlId="formAutor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                as="select"
                name="autorId"
                value={updatedBookData.autorId}
                onChange={handleInputChange}
                isInvalid={!!errors.autorId}
              >
                <option value="">Select Author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.first_name + ' ' + author.last_name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.autorId}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          {genres && (
            <Form.Group controlId="formGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                name="genreId"
                value={updatedBookData.genreId}
                onChange={handleInputChange}
                isInvalid={!!errors.genreId}
              >
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.id}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.genreId}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={updatedBookData.price}
              onChange={handleInputChange}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>
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
