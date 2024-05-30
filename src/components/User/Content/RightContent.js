import React from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz, handleClickFinish } = props;

  const onTimeUp = () => {
    handleClickFinish();
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
              <div className="question" key={data.questionId}>
                {idx + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
