import instance from "../utils/axios";

const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return instance.post("api/v1/participant", data);
};

const getAllUsers = () => {
  return instance.get("api/v1/participant/all");
};

const putUpdateNewUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return instance.put("api/v1/participant", data);
};

const deleteUser = (userId) => {
  return instance.delete("api/v1/participant", { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
  return instance.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return instance.post("api/v1/login", { email, password, delay: 1000 });
};

const postRegister = (email, password, username) => {
  return instance.post("api/v1/register", { email, password, username });
};

const getQuizByUser = () => {
  return instance.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (id) => {
  return instance.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  return instance.post(`api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (description, name, image, difficulty) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("quizImage", image);
  data.append("difficulty", difficulty);
  return instance.post("api/v1/quiz", data);
};

const getAllQuiz = () => {
  return instance.get(`api/v1/quiz/all`);
};

const putUpdateQuizForAdmin = (id, name, description, difficulty, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("quizImage", image);
  data.append("difficulty", difficulty);
  return instance.put("api/v1/quiz", data);
};

const deleteQuizForAdmin = (id) => {
  return instance.delete(`api/v1/quiz/${id}`);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return instance.post("api/v1/question", data);
};

const postCreateNewAnswerForQuiz = (
  question_id,
  description,
  correct_answer
) => {
  return instance.post("api/v1/answer", {
    question_id,
    description,
    correct_answer,
  });
};

const postAssignQuiz = (userId, quizId) => {
  return instance.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = (quidId) => {
  return instance.get(`api/v1/quiz-with-qa/${quidId}`);
};

const postUpsertQA = async (data) => {
  try {
    const response = await instance.post(`api/v1/quiz-upsert-qa`, {
      ...data,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const postLogout = (email, refresh_token) => {
  return instance.post("api/v1/logout", { email, refresh_token });
};

const getOverview = () => {
  return instance.get(`api/v1/overview`);
};

const postChangePassword = (current_password, new_password) => {
  return instance.post("api/v1/change-password", {
    current_password,
    new_password,
  });
};

const getHistory = () => {
  return instance.get("api/v1/history");
};

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateNewUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuiz,
  putUpdateQuizForAdmin,
  deleteQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuiz,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQA,
  postLogout,
  getOverview,
  postChangePassword,
  getHistory,
};
