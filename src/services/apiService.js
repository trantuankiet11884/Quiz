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

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateNewUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
};
