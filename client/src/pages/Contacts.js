import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { sendMessage } from '../http/UserAPI';

const Contacts = observer(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("fromDta" + formData.name + formData.email + formData.message)
    sendMessage({nameUser:formData.name, email:formData.email, message:formData.message});
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <Container>
        <Row>
        <h4>Who are we?</h4>
<p>Hi! We are a BookStore, an online store created just for you!. Our store appeared in 2023 and since then has sold as many books as the territory of Gibraltar occupies.</p>
<p>On our shelves are books of all significant publishers: except "Eksmo" and "AST", these are "Mann, Ivanov and Ferber", "ABC", "Alpina", "Sinbad" and others.</p>
<h3>What are we doing?</h3>
<p>We don't just sell books and stationery. Book24.ru - part of the publishing house, which means that we are much closer to the process of the appearance of books in your hands than a regular online store.</p>
<p>This closeness allows us to be experts. We know in advance when new items come out and get them first.</p>
        </Row>
      <Row>
        <Col md={12}>
          <h2>Contact Administrator</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Your name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Your Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Message:</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
              />
            </Form.Group>

            <Button type="submit">Send Message</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
});

export default Contacts;
