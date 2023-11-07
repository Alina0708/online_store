import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index"
import { ListGroup } from 'react-bootstrap';

const AutorsBar = observer(() => {
    const {books} = useContext(Context)

    return(
    <ListGroup>
    {books.autors.map(autors =>
        <ListGroup.Item
            style={{cursor: 'pointer'}}
            active={autors.id === books._selectedAutors.id}
            onClick={() => books.setSelectedAutors(autors)}
            key={autors.id}
        >
            {autors.first_name + " "}
            {autors.last_name}
        </ListGroup.Item>
                )}
    </ListGroup>
    );
})

export default AutorsBar;