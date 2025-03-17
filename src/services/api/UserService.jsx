import axios from "../../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("username", username);
  formData.append("role", role);
  formData.append("userImage", image);

  return axios.post("api/v1/participant", formData);
};

const getListUsers = () => axios.get("api/v1/participant/all");

const getUpdateUser = (id, username, role, image) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("username", username);
  formData.append("role", role);
  formData.append("userImage", image);

  return axios.put("api/v1/participant", formData);
};
const deleteUserById = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const updateProfile = (username, userImage) => {
  return axios.post(`api/v1/profile`);
};

export {
  postCreateNewUser,
  getListUsers,
  getUpdateUser,
  deleteUserById,
  getUserWithPaginate,
  updateProfile,
};
