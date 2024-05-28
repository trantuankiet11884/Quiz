import React, { useEffect, useState } from "react";
import {
  deleteQuizForAdmin,
  getAllQuiz,
  putUpdateQuizForAdmin,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";

const difficultyOptions = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const TableQuiz = ({ quizzes, setQuizzes }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [quizToUpdate, setQuizToUpdate] = useState({
    id: "",
    name: "",
    description: "",
    difficulty: "",
    image: null,
  });

  useEffect(() => {
    const fetchListQuiz = async () => {
      const rs = await getAllQuiz();
      if (rs?.EC === 0) setQuizzes(rs.DT);
    };
    fetchListQuiz();
  }, [setQuizzes]);

  const handleDeleteQuiz = (id) => {
    setShowDeleteModal(true);
    setQuizToDelete(id);
  };

  const confirmDeleteQuiz = async () => {
    const data = await deleteQuizForAdmin(quizToDelete);
    if (data?.EC === 0) {
      toast.success(data.EM);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.id !== quizToDelete)
      );
    } else {
      toast.error(data.EM);
    }
    setShowDeleteModal(false);
  };

  const handleUpdateQuiz = (quiz) => {
    setQuizToUpdate({
      ...quiz,
      difficulty: difficultyOptions.find(
        (option) => option.value === quiz.difficulty
      ),
      image: null,
    });
    setShowUpdateModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizToUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption) => {
    setQuizToUpdate((prev) => ({ ...prev, difficulty: selectedOption }));
  };

  const handleImageChange = (e) => {
    setQuizToUpdate((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const confirmUpdateQuiz = async () => {
    const { id, name, description, difficulty, image } = quizToUpdate;
    const data = await putUpdateQuizForAdmin(
      id,
      name,
      description,
      difficulty.value,
      image
    );
    if (data?.EC === 0) {
      toast.success(data.EM);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.id === id
            ? { ...quiz, name, description, difficulty: difficulty.value }
            : quiz
        )
      );
    } else {
      toast.error(data.EM);
    }
    setShowUpdateModal(false);
  };

  return (
    <>
      <div className="title">List Quiz</div>
      <table className="table table-hover my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Difficulty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>{quiz.id}</td>
              <td>{quiz.name}</td>
              <td>{quiz.description}</td>
              <td>{quiz.difficulty}</td>
              <td>
                <button
                  className="btn btn-warning mx-2"
                  onClick={() => handleUpdateQuiz(quiz)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteQuiz(quiz.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteQuiz}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formQuizName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={quizToUpdate.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuizDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={quizToUpdate.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuizDifficulty">
              <Form.Label>Difficulty</Form.Label>
              <Select
                options={difficultyOptions}
                onChange={handleSelectChange}
                value={quizToUpdate.difficulty}
                placeholder="Select Difficulty"
              />
            </Form.Group>
            <Form.Group controlId="formQuizImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmUpdateQuiz}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableQuiz;
