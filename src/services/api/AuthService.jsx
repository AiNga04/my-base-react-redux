import axios from "../../utils/axiosCustomize";

const postLogin = (email, password) => {
  return axios.post("api/v1/login", {
    email,
    password,
  });
};
const postRegister = (email, username, password) => {
  return axios.post("api/v1/register", {
    email: email,
    username: username,
    password: password,
  });
};

export { postLogin, postRegister };
