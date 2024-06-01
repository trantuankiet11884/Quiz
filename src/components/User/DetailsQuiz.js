import "./detailquiz.scss";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import Question from "./Question";
import { toast } from "react-toastify";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailsQuiz = (props) => {
  const location = useLocation();
  const { id } = useParams();
  const quizId = id;
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  const fetchQuestions = async () => {
    let rs = await getDataQuiz(quizId);
    if (rs && rs.EC === 0) {
      let raw = rs.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, idx) => {
            if (idx === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            item.answers.isCorrect = false;
            answers.push(item.answers);
          });
          answers = _.orderBy(answers, ["id"], ["asc"]);
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handleClickPrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };
  const handleClickNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };
  const handleCheckedBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      let b = question.answers.map((item) => {
        if (item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      question.answers = b;
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  const handleClickFinish = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };

    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((data) => {
        let questionId = data.questionId;
        let userAnswerId = [];

        data.answers.forEach((a) => {
          if (a.isSelected) {
            userAnswerId.push(a.id);
          }
        });

        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answers;
      let rs = await postSubmitQuiz(payload);

      if (rs && rs.EC === 0) {
        setIsSubmitQuiz(true);
        setDataModalResult({
          countCorrect: rs?.DT?.countCorrect,
          countTotal: rs?.DT?.countTotal,
          quizData: rs?.DT?.quizData,
        });
        setIsShowModalResult(true);
        // iscorrect submit show answer
        if (rs.DT && rs.DT.quizData) {
          let dataQuizClone = _.cloneDeep(dataQuiz);
          console.log(dataQuizClone);
          let a = rs.DT.quizData;
          for (let q of a) {
            for (let i = 0; i < dataQuizClone.length; i++) {
              if (+q.questionId === +dataQuizClone[i].questionId) {
                let newAnswers = [];
                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                  let s = q.systemAnswers.find(
                    (item) => +item.id === +dataQuizClone[i].answers[j].id
                  );
                  if (s) {
                    dataQuizClone[i].answers[j].isCorrect = true;
                  }
                  newAnswers.push(dataQuizClone[i].answers[j]);
                }
                dataQuizClone[i].answers = newAnswers;
              }
            }
          }
          setDataQuiz(dataQuizClone);
        }
      } else {
        toast.error(rs.EM);
      }
    }
  };

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img src="" alt="" />
        </div>
        <div className="q-content">
          <Question
            dataQuiz={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            index={index}
            handleCheckedBox={handleCheckedBox}
            isShowAnswer={isShowAnswer}
            isSubmitQuiz={isSubmitQuiz}
          />
        </div>
        <div className="footer">
          <button className="btn btn-default" onClick={() => handleClickPrev()}>
            Prev
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleClickNext()}
          >
            Next
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleClickFinish()}
            disabled={isSubmitQuiz}
          >
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent
          dataQuiz={dataQuiz}
          handleClickFinish={handleClickFinish}
          setIndex={setIndex}
        />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
        setIsShowAnswer={setIsShowAnswer}
      />
    </div>
  );
};

export default DetailsQuiz;
