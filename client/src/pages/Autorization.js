import React, {useContext, useState} from 'react';
import { Container, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {NavLink, useNavigate} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import image from "../image/1.jpg";
import {authorization} from "../http/UserAPI";
import { observer } from 'mobx-react-lite';
import {Context} from "../index";


const Authorization = observer(() => {
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
   
    const {isAuth} = useContext(Context);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useNavigate();

    const sign = async() =>{
    let data = await authorization(email, password);
    if (data.role === 'admin') {
        isAuth.setIsAuth(true);
        isAuth.setIsAdmin(true);
        history("/controlbook");
      }
    if(data.role === 'USER'){
    isAuth.setIsAuth(true);
    isAuth.setIsAdmin(false);
    history("/shop");
      }
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content:center" style={{ ...backgroundStyle}}>
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card className="p-5">
                <h2 className='m-auto'>Авторизация</h2>
                <Form className='d-flex flex-column' style={{width: 500}}>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email || ''}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type="password"
                        value={password || ''}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                
                        <Button variant={"outline-success"} onClick={sign}>Войти</Button>
                        <div>
                                Нет аккаунта? <NavLink to="/registr">Зарегистрируйся!</NavLink>
                        </div>
                    </Row>

                </Form>
            </Card>
        </Container>
        </div>
    );
});

export default Authorization;
