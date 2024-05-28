import React, { useState } from "react";
import "./questions.scss";
import Select from "react-select";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";

const Questions = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);

  const [isPreViewImage, setIsPreViewImage] = useState(false);

  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    const questionsClone = _.cloneDeep(questions);
    const questionIndex = questionsClone.findIndex(
      (item) => item.id === questionId
    );

    if (questionIndex !== -1) {
      if (type === "ADD") {
        const newAnswer = {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        };
        questionsClone[questionIndex].answers.push(newAnswer);
      }
      if (type === "REMOVE") {
        const answersClone = questionsClone[questionIndex].answers.filter(
          (item) => item.id !== answerId
        );
        questionsClone[questionIndex].answers = answersClone;
      }
      setQuestions(questionsClone);
    }
  };

  const handleOnchange = (type, questionId, value) => {
    if (type === "QUESTIONS") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnchangeFileQuestion = (questionId, e) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") answer.isCorrect = value;

            if (type === "INPUT") answer.description = value;
          }
          return answer;
        }
      );

      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestionForQuiz = () => {
    console.log(questions);
  };

  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);

    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreViewImage(true);
    }
  };

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
        {questions &&
          questions.length > 0 &&
          questions.map((question, idx) => {
            return (
              <div className="q-main mb-3" key={question.id}>
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={question.description}
                      onChange={(e) =>
                        handleOnchange("QUESTIONS", question.id, e.target.value)
                      }
                    />
                    <label>Questions {idx + 1} Description</label>
                  </div>
                  <div className="group-upload">
                    <label className="label-upload" htmlFor={`${question.id}`}>
                      <RiImageAddFill size={24} color="#5a5f92" />
                    </label>
                    <input
                      type="file"
                      hidden
                      id={question.id}
                      onChange={(e) =>
                        handleOnchangeFileQuestion(question.id, e)
                      }
                    />
                    <span style={{ cursor: "pointer" }}>
                      {question.imageName ? (
                        <span onClick={() => handlePreviewImage(question.id)}>
                          {question.imageName}
                        </span>
                      ) : (
                        "No File is Uploaded"
                      )}
                    </span>
                  </div>
                  <div className="btn-add">
                    <span
                      onClick={() =>
                        handleAddRemoveQuestion("ADD", question.id)
                      }
                    >
                      <AiFillPlusCircle color="#198754" className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        className="mx-2"
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <AiFillMinusCircle
                          color="#dc3545"
                          className="icon-remove "
                        />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, idx) => {
                    return (
                      <div className="answers-content">
                        <input
                          type="checkbox"
                          className="form-check-input iscorrect"
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              question.id,
                              answer.id,
                              e.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="type"
                            className="form-control"
                            placeholder="@"
                            value={answer.description}
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "INPUT",
                                question.id,
                                answer.id,
                                e.target.value
                              )
                            }
                          />
                          <label>Answers {idx + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer(
                                "ADD",
                                question.id,
                                answer.id
                              )
                            }
                          >
                            <AiFillPlusCircle
                              color="#198754"
                              className="icon-add"
                            />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                              className="mx-2"
                            >
                              <AiFillMinusCircle
                                color="#dc3545"
                                className="icon-remove mx-2"
                              />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}

        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => handleSubmitQuestionForQuiz()}
            >
              Save Questions
            </button>
          </div>
        )}
      </div>
      {isPreViewImage === true && (
        <Lightbox
          image={dataImagePreview.url}
          title={dataImagePreview.title}
          onClose={() => setIsPreViewImage(false)}
        ></Lightbox>
      )}
    </div>
  );
};

export default Questions;
