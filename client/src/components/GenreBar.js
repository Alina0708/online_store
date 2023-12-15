import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup, Button } from "react-bootstrap";
import { BsX } from "react-icons/bs"; // Импортируйте иконку крестика

const GenreBar = observer(() => {
  const { books } = useContext(Context);

  const handleResetSelectedGenre = () => {
    books.setSelectedGenre({}); // Сбрасываем выбранные жанры при нажатии на крестик
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
      <ListGroup style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop:10 }}>
        {books.genre.map((genre) => (
          <ListGroup.Item
          style={{
            cursor: "pointer",
            backgroundColor: genre.id === (books.selectedGenre?.id || null) ? "blue" : "white", 
          }}
            active={genre.id === (books.selectedGenre?.id || null)} 
            onClick={() => books.setSelectedGenre(genre)}
            key={genre.id}
          >
            {genre.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button variant="light" onClick={handleResetSelectedGenre}>
          <BsX /> 
          Reset selection
        </Button>
      </div>
    </div>
  );
});

export default GenreBar;
