import React, { useState, useEffect } from "react";
import FormAutor from "../../components/models/FormAutor";
import { getAutors, deleteAutors } from "../../http/AutorAPI";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const ControlAutors = observer(() => {
  const [showAutorModal, setShowAutorModal] = useState(false);
  const [autors, setAutors] = useState([]);

  useEffect(() => {
    getAutors().then((data) => setAutors(data));
  }, []);

  const handleShowAutorModal = () => {
    setShowAutorModal(true);
  };

  const handleHideAutorModal = () => {
    setShowAutorModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this author?");
    if (confirmDelete) {
        
      deleteAutors(id).then((data) => {
        window.alert("delete")
        if (data.success) {
          // Если удаление прошло успешно, обновите список авторов
          setAutors((prevAutors) => prevAutors.filter((autor) => autor.id !== id));
          //getAutors().then((data) => setAutors(data));
        } else {
          console.error("Ошибка при удалении автора");
        }
      });
    }
  };

  return (
    <div>
      <Button
        style={{ width: 120, marginBottom: 10 }}
        onClick={handleShowAutorModal}
      >
        Add autor
      </Button>
      <FormAutor show={showAutorModal} onHide={handleHideAutorModal} />

      <table style={{ width: "100%", border: "1px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "5px" }}>ID</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Surname
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Name</th>
          </tr>
        </thead>
        <tbody>
          {autors.map((autor) => (
            <tr key={autor.id} style={{ cursor: "pointer" }} onDoubleClick={() => handleDelete(autor.id)}  onMouseOver={(e) => e.target.style.backgroundColor = 'blue'} onMouseOut={(e) => e.target.style.backgroundColor = ''}>
              <td style={{ border: "1px solid black", padding: "5px" }}>{autor.id}</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{autor.first_name}</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{autor.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ControlAutors;
