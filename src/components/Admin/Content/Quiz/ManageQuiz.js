import React, { useState } from "react";
import "./manageQuiz.scss";
import Select from "react-select";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState("");

  const handleChangeFile = (e) => {};

  return (
    <div className="quiz-container">
      <div className="title">Manage Quizzes</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <label>Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <label>Description</label>
          </div>
          <div className="my-3">
            <Select options={options} value={type} placeholder="Quiz Type" />
          </div>
          <div className="more-action ">
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleChangeFile(e)}
            />
          </div>
        </fieldset>
      </div>
      <div className="list-detail"></div>
    </div>
  );
};

export default ManageQuiz;
