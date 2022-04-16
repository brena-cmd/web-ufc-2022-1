import React from "react";
import { Link } from "react-router-dom";

const StudentTableRow = (props) => {
  const { id, name, course, ira } = props.student;
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{course}</td>
      <td>{ira}</td>
      <td>
        <Link to={`/editStudent/${id}`} className="btn btn-warning">
          Editar
        </Link>
      </td>
      <td>
        <button className="btn btn-danger">Apagar</button>
      </td>
    </tr>
  );
};
export default StudentTableRow;
