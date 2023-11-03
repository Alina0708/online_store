import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index"
import { Row } from 'react-bootstrap';
import BookCard from './BookCard';

const BooksList = observer(() => {
    const { books } = useContext(Context)

    return (
        <Row className='d-flex'>
            {books.books.map(book =>
                <BookCard key={book.id} bookitem={book} />
            )}
        </Row>

    );
})

export default BooksList;