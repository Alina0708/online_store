import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GenreBar from '../components/GenreBar';
import AutorsBar from '../components/AutorsBar';
import BooksList from '../components/BooksList';

const Shop = () =>{
    return(
        <Container>
            <Row className='mt-2'>

        <Col md={3}>
            <GenreBar/>
            <AutorsBar/>
        </Col>

        <Col md={9}>
         <BooksList/>
        </Col>

        </Row>
        </Container>
    );
};

export default Shop;