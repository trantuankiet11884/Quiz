import "./listquiz.scss";
import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);

  const fetchListQuiz = async () => {
    const rs = await getQuizByUser();
    if (rs && rs.EC === 0) {
      setArrQuiz(rs.DT);
    }
  };
  useEffect(() => {
    fetchListQuiz();
  }, []);

  return (
    <>
      <div className="list-quiz-container container">
        {arrQuiz &&
          arrQuiz.length > 0 &&
          arrQuiz.map((quiz, idx) => {
            return (
              <div key={quiz.id} className="card" style={{ width: "18rem" }}>
                <img
                  src={`data:image/jpeg;base64,${quiz.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Quiz {idx + 1}</h5>
                  <p className="card-text">{quiz.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                  >
                    Go somewhere
                  </button>
                </div>
              </div>
            );
          })}

        {arrQuiz && arrQuiz.length === 0 && (
          <span className="mx-auto h2 mt-5" style={{ color: "red" }}>
            You Don't Have Any Quiz Now...
          </span>
        )}
      </div>
    </>
  );
};

export default ListQuiz;
