import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../services/api/QuizService";

const QuizDetail = () => {
  const params = useParams();
  const quizId = params.id;
  const [quiz, setQuiz] = useState(null);

  const getQuizByIdApi = useCallback(async () => {
    const response = await getQuizById(quizId);
    setQuiz(response);
  }, [quizId]);

  useEffect(() => {
    getQuizByIdApi();
  }, [getQuizByIdApi]);

  return (
    <div>
      <h1>Quiz Detail</h1>
      {quiz && (
        <div>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
          {/* Add more quiz details here */}
        </div>
      )}
    </div>
  );
};

export default QuizDetail;
