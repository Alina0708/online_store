import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createBook } from '../../http/AutorAPI';

const AddBookModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: '',
    autorId: '',
    description: '',
    price: '',
    genreId: '',
    img: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, autorId, description, price, genreId, img } = formData;

    if (!name || !autorId || !description || !price || !genreId || !img) {
      alert('Please fill in all fields');
      return;
    }

    if (isNaN(Number(autorId)) || isNaN(Number(price)) || Number(autorId) < 0 || Number(price) < 0) {
      alert('Please enter valid numerical values for autorId and price (non-negative)');
      return;
    }

    createBook(formData);
    setFormData({
      name: '',
      autorId: '',
      description: '',
      price: '',
      genreId: '',
      img: null,
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBookName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAutorId">
            <Form.Label>Autor ID:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter autor ID"
              name="autorId"
              value={formData.autorId}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGenreId">
            <Form.Label>Genre ID:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter genre ID"
              name="genreId"
              value={formData.genreId}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image:</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddBookModal;
