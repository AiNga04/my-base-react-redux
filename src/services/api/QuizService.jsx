import axios from "../../utils/axiosCustomize";
const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getQuizById = (quizId) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
};

const postSubmitQuiz = (data) => {
  return axios.post("api/v1/quiz-submit", { ...data });
};

const getListQuiz = () => axios.get("api/v1/quiz/all");

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("quizImage", quizImage);

  return axios.post("api/v1/quiz", formData);
};

const getUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("description", description);
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("quizImage", quizImage);

  return axios.put("api/v1/quiz", formData);
};

const deleteQuizById = (quizId) => {
  return axios.delete(`api/v1/quiz/${quizId}`);
};

const postAssignQuizToUser = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};

const getQuizByQA = (qApiId) => {
  return axios.get(`api/v1/quiz-with-qa/${qApiId}`);
};

export {
  getQuizByUser,
  getQuizById,
  postSubmitQuiz,
  getListQuiz,
  postCreateNewQuiz,
  getUpdateQuiz,
  deleteQuizById,
  postAssignQuizToUser,
  getQuizByQA,
};
