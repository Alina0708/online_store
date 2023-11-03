import React from 'react';
import { Container, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import image from "../image/1.jpg";

const Registration = () =>{
    const backgroundStyle = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '70%',
        maxWidth: '700px',
        maxHeight: '600px',
        marginTop: '3%',
        marginLeft: '30%',
    };    
        return (
            <div className="d-flex flex-column align-items-center justify-content:center" style={{ ...backgroundStyle}}>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
                <Card className="p-5">
                    <h2 className='m-auto'>Регистрация</h2>
                    <Form className='d-flex flex-column' style={{width: 500}}>
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш email..."
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш пароль..."
                            type="password"
                        />
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            <Button variant={"outline-success"}>Зарегистрироваться</Button>
                        </Row>
    
                    </Form>
                </Card>
            </Container>
            </div>
        );
};

export default Registration;