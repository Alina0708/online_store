import React, { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { getGenre, deleteGenre } from "../../http/AutorAPI";
import AddGenreModal from "../models/AddGenreModal";

const ControlGenre = observer(({genres, setGenres}) => {
  const [showTable, setShowTable] = useState(false);
  const [showAddGenreModal, setShowAddGenreModal] = useState(false);

  useEffect(() => {
    updateGenresList();
  }, [genres?.length]);

  const updateGenresList = () => {
    getGenre().then((data) => {
      setGenres(data);
    });
  };

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const handleRowDoubleClick = ({ id }) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this genre?"
    );
    if (confirmDelete && id) {
      deleteGenre({ id }).then((data) => {
        window.alert("Delete " + data);
        getGenre().then((data) => setGenres(data));
      });
    }
  };

  const toggleAddGenreModal = () => {
    setShowAddGenreModal(!showAddGenreModal);
  };

  return (
    <Container>
      <div style={{ marginBottom: 10 }}>Genres</div>
      <Button
        onClick={toggleTable}
        style={{ width: 200, marginBottom: 10, marginTop: 10 }}
        variant="outline-primary"
      >
        Show List Genres
      </Button>
      <Button
        style={{ width: 120, marginBottom: 10, marginLeft: 10, marginTop: 10 }}
        onClick={toggleAddGenreModal}
      >
        Add genre
      </Button>
      <AddGenreModal show={showAddGenreModal} onHide={toggleAddGenreModal} updateGenresList={updateGenresList} setGenres={setGenres}/>
      {showTable && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr
                key={genre.id}
                onDoubleClick={() => handleRowDoubleClick({ id: genre.id })}
              >
                <td style={{ cursor: "pointer" }} className="hover-style">
                  {genre.id}
                </td>
                <td style={{ cursor: "pointer" }} className="hover-style">{genre.name}</td>
                <td style={{ cursor: "pointer" }} className="hover-style">{genre.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <style>
        {`
          .hover-style:hover {
            background-color: #e6f7ff; 
          }
        `}
      </style>
    </Container>
  );
});

export default ControlGenre;
