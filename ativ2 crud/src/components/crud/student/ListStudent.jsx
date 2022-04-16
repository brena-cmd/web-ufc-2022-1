import React from "react";
import { students } from "./data";
import StudentTableRow from "./StudentTableRow";

const ListStudent = () => {
  function generateTable() {
    if (!students) return;
    return students.map((student, i) => {
      return <StudentTableRow student={student} key={i} />;
    });
  }

  return (
    <div>
      <h2>Listar Estudante</h2>
      <table className="table table-striped">
        <thead>
          <th>ID</th>
          <th>Nome</th>
          <th>Curso</th>
          <th>IRA</th>
          <th colSpan="2"></th>
        </thead>
        <tbody>{generateTable()}</tbody>
      </table>
    </div>
  );
};

export default ListStudent;
