import React from 'react';
import {observer} from "mobx-react-lite";
import { Card, Col} from 'react-bootstrap';
import Image from "react-bootstrap/Image";
import star from "../image/pngwing.com.png";
import { useNavigate } from 'react-router-dom';


const BookCard = observer(({bookitem}) => {
    const history =  useNavigate();
    return(
<Col md={3} className='mt-3' onClick={() => {history(`/shop/${bookitem.id}`)}}>
    <Card style={{width:150, cursor:'pointer'}} border={"light"}>
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