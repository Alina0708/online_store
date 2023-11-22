import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const GenreBar = observer(() => {
  const { books } = useContext(Context);

  return (
    <ListGroup style={{display: "flex", flexDirection: "row", justifyContent:"center"}}>
      {books.genre.map((genre) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={genre.id === books._selectedGenre.id}
          onClick={() => books.setSelectedGenre(genre)}
          key={genre.id}
        >
          {genre.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default GenreBar;
