import React, { useEffect, useState } from "react";
import { getAllQuiz } from "../../../../services/apiService";

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);

  const fetchListQuiz = async () => {
    const rs = await getAllQuiz();
    if (rs && rs.EC === 0) {
      setListQuiz(rs.DT);
    }
  };

  useEffect(() => {
    fetchListQuiz();
  }, []);

  return (
    <>
      <div className="title">List Quiz</div>
      <table className="table table-hover my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((quiz, idx) => {
              return (
                <tr key={quiz.id}>
                  <td>{quiz.id}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.description}</td>
                  <td>{quiz.difficulty}</td>
                  <td>
                    <button className="btn btn-warning mx-2">Update</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
