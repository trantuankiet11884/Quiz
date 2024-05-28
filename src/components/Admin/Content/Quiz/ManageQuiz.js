import React, { useState } from "react";
import "./manageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Acccordion from "react-bootstrap/Accordion";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState(null);

  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!name || !description)
      return toast.error("Name/Description is required!!!");
    const rs = await postCreateNewQuiz(
      name,
      description,
      image,
      difficulty?.value
    );
    if (rs && rs.EC === 0) {
      toast.success(rs.EM);
      setName("");
      setDescription("");
      setImage(null);
      setDifficulty("");
    } else {
      toast.error(rs.EM);
    }
  };

  return (
    <div className="quiz-container">
      <Acccordion>
        <Acccordion.Item>
          <Acccordion.Header>
            <div className="title">Manage Quizzes</div>
          </Acccordion.Header>

          <Acccordion.Body>
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
                  <Select
                    options={options}
                    onChange={setDifficulty}
                    value={difficulty}
                    placeholder="Quiz Type"
                  />
                </div>
                <div className="more-action ">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleChangeFile(e)}
                  />
                </div>
                <div className="mt-3 text-end">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSubmitQuiz()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Acccordion.Body>
        </Acccordion.Item>
      </Acccordion>

      <div className="list-detail">
        <TableQuiz />
      </div>
    </div>
  );
};

export default ManageQuiz;
