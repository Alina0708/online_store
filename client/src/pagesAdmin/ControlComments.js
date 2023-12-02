import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { getAllCommentsBook, deleteComment } from "../http/AutorAPI";

const ControlComments = observer(() => {
  const [comments, setComments] = useState({});

  useEffect(() => {
    getAllCommentsBook().then((data) => setComments(data));
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      const delComment = window.confirm(
        "Are you sure delete comment " +  commentId  + "?"
      );
      if (delComment) {
        await deleteComment(commentId);
        getAllCommentsBook().then((data) => setComments(data));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <Container>
      <h2>Comments</h2>
      <Table bordered>
        <thead>
          <tr>
            <th>Image</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(comments).map(([image, commentsArray]) => (
            <tr key={image}>
              <td>
                <img
                  src={`http://localhost:5000/${image}`}
                  alt="Book cover"
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>
                <Table>
                  <tbody>
                    {commentsArray.map((comment) => (
                      <tr
                      className="custom-table-row"
                        key={comment.id}
                        onDoubleClick={() => handleDeleteComment(comment.id)}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "inherit"}
                      >
                        <td>{comment.id}</td>
                        <td>{comment.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
});

export default ControlComments;
