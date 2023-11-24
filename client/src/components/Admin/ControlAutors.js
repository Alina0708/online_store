import React, { useState, useEffect } from "react";
import FormAutor from "../../components/models/FormAutor";
import { getAutors, deleteAutors } from "../../http/AutorAPI";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const ControlAutors = observer(() => {
  const [showTable, setShowTable] = useState(false);
  const [showAutorModal, setShowAutorModal] = useState(false);
  const [autors, setAutors] = useState([]);

  useEffect(() => {
    getAutors().then((data) => setAutors(data));
  }, [autors?.length]);

  const handleShowTable = () => {
    setShowTable(!showTable); 
  };

  const handleShowAutorModal = () => {
    setShowAutorModal(true);
  };

  const handleHideAutorModal = () => {
    setShowAutorModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this author?");
    if (confirmDelete) {
      deleteAutors({ id }).then((data) => {
        window.alert("delete");
      });
    }
  };

  return (
    <div>
       <div style={{marginBottom:10}}>Autors</div>
      <Button
        style={{ width: 200, marginBottom: 10, marginTop:10 }}
        onClick={handleShowTable} 
        variant="outline-primary"
      >
        {showTable ? "Hide list autors" : "Show list autors"}
      </Button>

      <Button
        style={{ width: 120, marginBottom: 10, marginLeft: 10,  marginTop:10  }}
        onClick={handleShowAutorModal}
      >
        Add autor
      </Button>
      {showTable && (
        <>
          <table style={{ width: "100%", border: "1px solid #D3D3D3" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #D3D3D3", padding: "5px" }}>ID</th>
                <th style={{ border: "1px solid #D3D3D3", padding: "5px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid l#D3D3D3", padding: "5px" }}>Surname</th>
              </tr>
            </thead>
            <tbody>
              {autors.map((autor) => (
                <tr
                  key={autor.id}
                  style={{ cursor: "pointer" }}
                  onDoubleClick={() => handleDelete(autor.id)}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#e6f7ff")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "")}
                >
                  <td style={{ border: "1px solid #D3D3D3", padding: "5px" }}>
                    {autor.id}
                  </td>
                  <td style={{ border: "1px solid #D3D3D3", padding: "5px" }}>
                    {autor.first_name}
                  </td>
                  <td style={{ border: "1px solid #D3D3D3", padding: "5px" }}>
                    {autor.last_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <FormAutor show={showAutorModal} onHide={handleHideAutorModal} />
        </>
      )}
    </div>
  );
});

export default ControlAutors;
