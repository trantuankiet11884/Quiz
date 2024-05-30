import React, { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz, handleClickFinish, setIndex } = props;
  const refDiv = useRef([]);

  const onTimeUp = () => {
    handleClickFinish();
  };

  const getClassQuestion = (questions, idx) => {
    if (questions && questions.answers.length > 0) {
      let isAnswered = questions.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return "question selected ";
      }
    }
    return "question";
  };

  const handleClickQuestion = (question, idx) => {
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }

    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return;
      }
    }

    refDiv.current[idx].className = "question clicked";
    setIndex(idx);
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((data, idx) => {
            return (
              <div
                className={getClassQuestion(data, idx)}
                key={data.questionId}
                onClick={() => handleClickQuestion(data, idx)}
                ref={(ref) => (refDiv.current[idx] = ref)}
              >
                {idx + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
