import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
const DetailsQuiz = (props) => {
  const { id } = useParams();
  const quizId = id;

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
  return <div className="detail-quiz-container">DetailsQuiz</div>;
};

export default DetailsQuiz;
