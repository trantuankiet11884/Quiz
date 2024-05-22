import "./detailquiz.scss";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
const DetailsQuiz = (props) => {
  const location = useLocation();
  const { id } = useParams();
  const quizId = id;
  console.log(location);
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
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
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
          <div className="question">Question 1: what should you do?</div>
          <div className="answer">
            <div className="a-child">A. 1</div>
            <div className="a-child">B. 1</div>
            <div className="a-child">C. 1</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-default">Prev</button>
          <button className="btn btn-secondary">Next</button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};

export default DetailsQuiz;
