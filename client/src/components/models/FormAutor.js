import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import { createAutor } from '../../http/AutorAPI';
//import {createBrand, createType} from "../../http/deviceAPI";

const FormAutor = ({show, onHide}) => {
    const [first_name, setSurname] = useState('');
    const [last_name, setName] = useState('');

    const addAutor = () => {
        if(first_name && last_name){
        createAutor({first_name:first_name, last_name:last_name}).then(data => {
            setSurname("");
            setName("");
            onHide();
        })
    }
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add autor
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={first_name}
                        onChange={e => setSurname(e.target.value)}
                        placeholder={"Enter surname"}
                        style={{ marginBottom: '10px' }} 
                    />
                     <Form.Control
                        value={last_name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Enter name"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addAutor}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FormAutor;