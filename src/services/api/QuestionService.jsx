import axios from "../../utils/axiosCustomize";
const postCreateQuestion = (quiz_id, description, questionImage) => {
  const formData = new FormData();
  formData.append("quiz_id", quiz_id);
  formData.append("description", description);
  formData.append("questionImage", questionImage);

  return axios.post("api/v1/question", formData);
};

const postCreateAnswer = (description, correct_answer, question_id) => {
  return axios.post("api/v1/answer", {
    description: description,
    correct_answer: correct_answer,
    question_id: question_id,
  });
};

export { postCreateQuestion, postCreateAnswer };
