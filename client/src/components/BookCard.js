import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import { Card, Col} from 'react-bootstrap';
import Image from "react-bootstrap/Image";
import star from "../image/pngwing.com.png";
import { useNavigate } from 'react-router-dom';
import {getPopularBookInOrders, getNeBook } from "../http/AutorAPI";



const BookCard = observer(({bookitem}) => {
    const history =  useNavigate();
    const [popularBook, setPopularBook] = useState();
    const [newBook, setNewBook] = useState();

    useEffect(() => {
        getPopularBookInOrders().then((data) => setPopularBook(data))
        getNeBook().then(data => setNewBook(data))
      }, []);
      
    return(

<Col md={3} className='mt-3' onClick={() => {history(`/shop/${bookitem.id}`)}}>
    <Card style={{width:150, cursor:'pointer'}} border={"light"}>
        {popularBook && popularBook.map(popular => {
            return(
                <div>
            {popular.id === bookitem.id && <p className="bestseller">Bestseller</p>}
            </div>
            )
        })}
        {newBook && newBook.map(popular => {
            return(
                <div>
            {popular.id === bookitem.id && <p className="NewReleases">New Releases</p>}
            </div>
            )
        })}
    <Image width={200} height={300} src={"http://localhost:5000/" + bookitem.img}/>
       <div>
        <div>{bookitem.name}</div>
        <div className='d-flex align-item-center mt-1'>
            <p>{bookitem.rating}</p>
            <Image src={star} width={20} height={20}/>
        </div>
       </div>
    </Card>
</Col>

    );
})

export default BookCard;