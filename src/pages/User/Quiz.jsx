import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getQuizByUser } from "../../services/api/QuizService";
import "./Quiz.scss";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    const data = await getQuizByUser();
    if (data && data.EC === 0) setListQuiz(data.DT);
    if (data && data.EC !== 0)
      console.error("Error fetching quiz list:", data.EM);
  };

  return (
    <div className="quiz-container container">
      {listQuiz && listQuiz.length > 0 ? (
        listQuiz.map((quiz, index) => {
          return (
            <Card key={index} style={{ width: "18rem" }} className="quiz-item">
              <Card.Img
                variant="top"
                src={`data:image/png;base64, ${quiz.image}`}
                className="quiz-image"
              />
              <Card.Body>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text>Description: {quiz.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`/quiz/${quiz.id}`, {
                      state: {
                        QuizTitle: quiz.description,
                      },
                    });
                  }}
                >
                  Start Quiz
                </Button>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <div>You don't have any quiz now</div>
      )}
    </div>
  );
};

export default Quiz;
