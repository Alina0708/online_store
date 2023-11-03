import React from 'react';
import {observer} from "mobx-react-lite";
import { Card, Col} from 'react-bootstrap';
import Image from "react-bootstrap/Image";
import star from "../image/pngwing.com.png";

const BookCard = observer(({bookitem}) => {
console.log(bookitem)
    return(
<Col md={3}>
    <Card style={{width:150, cursor:'pointer'}} border={"light"}>
       <Image width={200} src={bookitem.img}/>
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