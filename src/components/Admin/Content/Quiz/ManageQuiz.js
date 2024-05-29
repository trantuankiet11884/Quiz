import React, { useState } from "react";
import "./manageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

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
      setQuizzes((prevQuizzes) => [
        ...prevQuizzes,
        {
          id: rs.DT.id, // Assuming the API response includes the new quiz ID in rs.DT.id
          name,
          description,
          difficulty: difficulty.value,
          image,
        },
      ]);
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
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="title">Manage Quizzes</div>
          </Accordion.Header>
          <Accordion.Body>
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
                    onChange={handleChangeFile}
                  />
                </div>
                <div className="mt-3 text-end">
                  <button
                    className="btn btn-warning"
                    onClick={handleSubmitQuiz}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="list-detail">
              <TableQuiz quizzes={quizzes} setQuizzes={setQuizzes} />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div className="title">Update Quizzes</div>
          </Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <div className="title">Assign to Users</div>
          </Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
