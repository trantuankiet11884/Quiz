import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  getAllQuiz,
  getAllUsers,
  postAssignQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const AssignQuiz = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [listQuiz, setListQuiz] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchListQuiz();
    fetchListUser();
  }, []);

  const fetchListQuiz = async () => {
    const rs = await getAllQuiz();
    if (rs?.EC === 0) {
      const newQuizzes = rs.DT.map((quiz) => ({
        value: quiz.id,
        label: `${quiz.id} - ${quiz.name}`,
      }));
      setListQuiz(newQuizzes);
    }
  };

  const fetchListUser = async () => {
    const rs = await getAllUsers();
    if (rs?.EC === 0) {
      const newUsers = rs.DT.map((user) => ({
        value: user.id,
        label: `${user.id} - ${user.username} - ${user.email}`,
      }));
      setListUser(newUsers);
    }
  };

  const handleSubmitAssign = async () => {
    if (!selectedQuiz || !selectedUser) {
      toast.info("Please select both a quiz and a user.");
      return;
    }

    const rs = await postAssignQuiz(selectedUser.value, selectedQuiz.value);
    if (rs?.EC === 0) {
      toast.success(rs?.EM);
    } else {
      toast.error(rs?.EM);
    }
    console.log(selectedQuiz.value, selectedUser.value);
  };

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz</label>
        <Select
          options={listQuiz}
          onChange={setSelectedQuiz}
          value={selectedQuiz}
        />
      </div>

      <div className="col-6 form-group">
        <label className="mb-2">Select User</label>
        <Select
          options={listUser}
          onChange={setSelectedUser}
          value={selectedUser}
        />
      </div>

      <div>
        <button className="btn btn-success mt-3" onClick={handleSubmitAssign}>
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
