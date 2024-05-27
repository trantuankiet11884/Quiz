import React, { useState } from "react";
import "./questions.scss";
import Select from "react-select";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";

const Questions = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <div className="questions-container">
      <div className="title">Manage Question</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz</label>
          <Select
            options={options}
            onChange={setSelectedQuiz}
            defaultValue={selectedQuiz}
          />
        </div>
        <div className="mt-3 mb-2">Add Questions:</div>
        <div>
          <div className="questions-content">
            <div className="form-floating description">
              <input type="text" className="form-control" placeholder="Name" />
              <label>Questions Description</label>
            </div>
            <div className="group-upload">
              <label className="label-upload">
                <RiImageAddFill size={24} color="#5a5f92" />
              </label>
              <input type="file" hidden />
              <span>No file is uploaded</span>
            </div>
            <div className="btn-add">
              <span>
                <AiFillPlusCircle color="#198754" className="icon-add" />
                <AiFillMinusCircle
                  color="#dc3545"
                  className="icon-remove mx-2"
                />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input type="checkbox" className="form-check-input iscorrect" />
            <div className="form-floating answer-name">
              <input type="type" className="form-control" placeholder="@" />
              <label>answers 1</label>
            </div>
            <div className="btn-group">
              <span>
                <AiFillPlusCircle color="#198754" className="icon-add" />
                <AiFillMinusCircle
                  color="#dc3545"
                  className="icon-remove mx-2"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
