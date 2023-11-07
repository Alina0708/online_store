import React, {useState} from 'react';
import { Container, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import image from "../image/1.jpg";
import { registration } from '../http/UserAPI';
import { observer } from 'mobx-react-lite';
import {useNavigate} from "react-router-dom";

const Registration = observer(() =>{
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
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useNavigate();
    const registr = async() =>{
    let data = await registration(email, password);
    history("/");
    }
        return (
            <div className="d-flex flex-column align-items-center justify-content:center" style={{ ...backgroundStyle}}>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
                <Card className="p-5">
                    <h2 className='m-auto'>Регистрация</h2>
                    <Form className='d-flex flex-column' style={{width: 500}}>
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш email..."
                            value={email || ""}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш пароль..."
                            type="password"
                            value={password  || ""}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            <Button variant={"outline-success"} onClick={registr}>Зарегистрироваться</Button>
                        </Row>
    
                    </Form>
                </Card>
            </Container>
            </div>
        );
});

export default Registration;