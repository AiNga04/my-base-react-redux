import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import _ from "lodash";
import "./ModalShowResult.scss";

const ModalShowResult = (props) => {
  const { show, setShow, dataModalResult } = props;
  const listData = useSelector((state) => state.quiz.listData);
  const [quiz, setQuiz] = useState([]);

  const handleClickClose = () => {
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (show) {
      let listResult = dataModalResult.quizData;
      let ans = [];
      let ansTrue = [];
      listResult.map((quiz) => {
        ans.push(quiz.userAnswers);
        ansTrue.push(quiz.systemAnswers[0].id);
      });

      let data = _.chain(listData)
        .groupBy("id")
        .map((value, key) => {
          let answers = value.map((item) => ({
            ...item.answers,
            isSelected: ans.some((answer) => answer.includes(item.answers.id)),
            isCorrect: ansTrue.includes(item.answers.id),
            isIncorrect:
              ans.some((answer) => answer.includes(item.answers.id)) &&
              !ansTrue.includes(item.answers.id),
          }));

          return {
            questionId: key,
            questionDescriptions: value[0]?.description || "",
            image: value[0]?.image || null,
            answers,
          };
        })
        .value();

      setQuiz(data);
    }
  }, [show, listData, dataModalResult]);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    let quizClone = _.cloneDeep(quiz);
    quizClone[questionIndex].answers.forEach((item, idx) => {
      item.isSelected = idx === answerIndex;
    });

    setQuiz(quizClone);
  };

  return (
    <>
      <Modal show={show} fullscreen={true} onHide={handleClickClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Show Result Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {!_.isEmpty(quiz) &&
            quiz.map((question, index) => (
              <div key={index} className="question-block">
                <h2>Question {index + 1}</h2>
                <div className="question-image">
                  {question.image && (
                    <img
                      src={`data:image/png;base64, ${question.image}`}
                      alt="Question"
                    />
                  )}
                </div>
                <p>{question.questionDescriptions}</p>
                <div className="answer-block">
                  {question.answers.map((item, idx) => (
                    <div
                      key={idx}
                      className={`form-check ${
                        item.isCorrect
                          ? "correct-answer"
                          : item.isIncorrect
                          ? "incorrect-answer"
                          : ""
                      }`}
                    >
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name={`question-${question.questionId}`}
                          value={idx}
                          checked={item.isSelected}
                          onChange={() => handleAnswerChange(index, idx)}
                          className="form-check-input"
                        />
                        {item.description}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalShowResult;
