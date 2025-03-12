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

export { getQuizByUser, getQuizById, postSubmitQuiz };
