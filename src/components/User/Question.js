import React, { useState } from "react";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
  const { dataQuiz, index, handleCheckedBox } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  if (_.isEmpty(dataQuiz)) {
    return <></>;
  }

  const handleCheckBox = (e, aId, qId) => {
    handleCheckedBox(aId, qId);
  };

  return (
    <>
      {dataQuiz.image && (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            src={`data:image/jpeg;base64,${dataQuiz.image}`}
            alt="Quiz image"
            onClick={() => setIsPreviewImage(true)}
          />
          {isPreviewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${dataQuiz.image}`}
              title="question image"
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      )}
      <div className="question">
        Question {+index + 1}: {dataQuiz.questionDescription}?
      </div>
      <div className="answer">
        {dataQuiz.answers &&
          dataQuiz.answers.length > 0 &&
          dataQuiz.answers.map((answer, idx) => {
            return (
              <div key={answer.id} className="a-child">
                <div className="a-child">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={answer.isSelected}
                      onChange={(e) =>
                        handleCheckBox(e, answer.id, dataQuiz.questionId)
                      }
                      id={answer.id}
                    />
                    <label htmlFor={answer.id}>{answer.description}</label>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
