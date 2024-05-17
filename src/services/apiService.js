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

export { postCreateNewUser, getAllUsers, putUpdateNewUser };
