import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllQuiz, getAllUsers } from "../../../../services/apiService";

const AssignQuiz = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  const [selectedUser, setSelectedUser] = useState({});
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchListQuiz();
    fetchListUser();
  }, []);

  const fetchListQuiz = async () => {
    const rs = await getAllQuiz();
    if (rs?.EC === 0) {
      let newQuizzes = rs.DT.map((quiz) => {
        return {
          value: quiz.id,
          label: `${quiz.id} - ${quiz.description}`,
        };
      });
      setListQuiz(newQuizzes);
    }
  };

  const fetchListUser = async () => {
    const rs = await getAllUsers();
    if (rs?.EC === 0) {
      let newUsers = rs.DT.map((user) => {
        return {
          value: user.id,
          label: `${user.id} - ${user.username} - ${user.email}`,
        };
      });
      setListUser(newUsers);
    }
  };

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz</label>
        <Select
          options={listQuiz}
          onChange={setSelectedQuiz}
          defaultValue={selectedQuiz}
        />
      </div>

      <div className="col-6 form-group">
        <label className="mb-2">Select User</label>
        <Select
          options={listUser}
          onChange={setSelectedUser}
          defaultValue={selectedUser}
        />
      </div>

      <div>
        <button className="btn btn-success mt-3">Assign</button>
      </div>
    </div>
  );
};

export default AssignQuiz;
