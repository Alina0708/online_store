import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createGenre, getGenre } from "../../http/AutorAPI";

const AddGenreModal = ({ show, onHide, updateGenresList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenres] = useState();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddGenre = () => {
    if (name.trim() === "" || description.trim() === "") {
      alert("Пожалуйста, заполните оба поля");
      return;
    } else {
      createGenre( name, description );
      setName("");
      setDescription("");
      getGenre().then((data) => setGenres(data));
      onHide();
      updateGenresList();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add genre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formGenreName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="inter name genre"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formGenreDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="inter description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddGenre}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddGenreModal;
