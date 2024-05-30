import React from "react";

const RightContent = (props) => {
  const { dataQuiz } = props;
  return (
    <>
      <div className="main-timer"></div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((data, idx) => {
            return <div className="question">{idx + 1}</div>;
          })}
      </div>
    </>
  );
};

export default RightContent;
