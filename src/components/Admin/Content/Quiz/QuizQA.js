import React, { useEffect, useState } from "react";
import "./quizQA.scss";
import Select from "react-select";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuiz,
  postCreateNewAnswerForQuiz,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const QuizQA = (props) => {
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

  const [questionErrors, setQuestionErrors] = useState([]);
  const [answerErrors, setAnswerErrors] = useState([]);

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  const fetchListQuiz = async () => {
    const rs = await getAllQuiz();
    if (rs?.EC === 0) {
      let newQuiz = rs.DT.map((quiz) => {
        return {
          value: quiz.id,
          label: `${quiz.id + " - " + quiz.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  useEffect(() => {
    fetchListQuiz();
  }, []);

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

  const handleSubmitQuestionForQuiz = async () => {
    if (!questions || questions.length === 0) return;

    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a quiz.");
      return;
    }

    let isValid = true;
    let invalidQuestionIndex = -1;
    let invalidAnswerIndex = -1;
    let questionErrorIndices = [];
    let answerErrorIndices = [];

    // Check for empty answers
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValid = false;
          invalidQuestionIndex = i;
          invalidAnswerIndex = j;
          answerErrorIndices.push({ questionIndex: i, answerIndex: j });
        }
      }
    }

    if (!isValid) {
      toast.error(
        `Answer ${invalidAnswerIndex + 1} in Question ${
          invalidQuestionIndex + 1
        } cannot be empty.`
      );
      setAnswerErrors(answerErrorIndices);
      return;
    }

    // Check for empty question descriptions
    let isValidQ = true;
    let invalidQuestionDescIndex = -1;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        invalidQuestionDescIndex = i;
        questionErrorIndices.push(i);
      }
    }

    if (!isValidQ) {
      toast.error(
        `Question ${invalidQuestionDescIndex + 1} description cannot be empty.`
      );
      setQuestionErrors(questionErrorIndices);
      return;
    }

    // Reset error states if valid
    setQuestionErrors([]);
    setAnswerErrors([]);

    try {
      await Promise.all(
        questions.map(async (question) => {
          const q = await postCreateNewQuestionForQuiz(
            +selectedQuiz.value,
            question.description,
            question.imageFile
          );

          if (question.answers && question.answers.length > 0) {
            await Promise.all(
              question.answers.map(async (answer) => {
                await postCreateNewAnswerForQuiz(
                  q.DT.id,
                  answer.description,
                  answer.isCorrect
                );
              })
            );
          }
        })
      );

      // Clear state after successful submission
      setQuestions([
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
      setSelectedQuiz({});
      toast.success("Questions submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit questions. Please try again.");
    }
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
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz</label>
          <Select
            options={listQuiz}
            onChange={setSelectedQuiz}
            defaultValue={selectedQuiz}
          />
        </div>
        <div className="mt-3 mb-2">Add Questions:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, qIdx) => {
            return (
              <div className="q-main mb-3" key={question.id}>
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className={`form-control ${
                        questionErrors.includes(qIdx) ? "is-invalid" : ""
                      }`}
                      placeholder="Name"
                      value={question.description}
                      onChange={(e) =>
                        handleOnchange("QUESTIONS", question.id, e.target.value)
                      }
                    />
                    <label>Questions {qIdx + 1} Description</label>
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
                  question.answers.map((answer, aIdx) => {
                    const isAnswerInvalid = answerErrors.some(
                      (error) =>
                        error.questionIndex === qIdx &&
                        error.answerIndex === aIdx
                    );
                    return (
                      <div className="answers-content" key={answer.id}>
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
                            className={`form-control ${
                              isAnswerInvalid ? "is-invalid" : ""
                            }`}
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
                          <label>Answers {aIdx + 1}</label>
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
      {isPreViewImage && (
        <Lightbox
          image={dataImagePreview.url}
          title={dataImagePreview.title}
          onClose={() => setIsPreViewImage(false)}
        ></Lightbox>
      )}
    </div>
  );
};
export default QuizQA;
