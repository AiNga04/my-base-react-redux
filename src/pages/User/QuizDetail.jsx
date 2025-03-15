import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuizById, postSubmitQuiz } from "../../services/api/QuizService";
import _ from "lodash";
import "./QuizDetail.scss";
import ModalResult from "./ModalResult";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setListData } from "../../redux/action/quizAction";

const QuizDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const [data, setData] = useState({});
  const [isShowModalResult, setIsShowModalResult] = useState(false);

  const getQuizByIdApi = useCallback(async () => {
    try {
      const response = await getQuizById(quizId);
      if (!response || !response.DT) return;

      let raw = response.DT;
      dispatch(setListData(raw));
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = value.map((item) => ({
            ...item.answers,
            isSelected: false,
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
    } catch (error) {
      toast.error(error);
    }
  }, [quizId, dispatch]);

  useEffect(() => {
    getQuizByIdApi();
  }, [getQuizByIdApi]);

  const handlePrev = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      setDisableNext(false);
      setDisablePrev(newIndex === 0);
      return newIndex;
    });
  };

  const handleNext = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      setDisablePrev(false);
      setDisableNext(newIndex === quiz.length - 1);
      return newIndex;
    });
  };

  const handleFinish = async () => {
    if (!window.confirm("Are you sure you want to submit the quiz?")) {
      return;
    }

    let object = {
      quizId: +quizId,
      answers: [],
    };

    quiz.forEach((item) => {
      let answer = {
        questionId: +item.questionId,
        userAnswerId: [],
      };

      item.answers.forEach((ans) => {
        if (ans.isSelected) {
          answer.userAnswerId.push(ans.id);
        }
      });

      object.answers.push(answer);
    });

    const dataResponse = await postSubmitQuiz(object);

    if (dataResponse && dataResponse.EC === 0) {
      setData(dataResponse.DT);
      setIsShowModalResult(true);
    } else {
      toast.error(dataResponse.EM);
    }
  };

  const handleAnswerChange = (temp) => {
    let quizClone = _.cloneDeep(quiz);
    quizClone[index].answers.forEach((item, idx) => {
      item.isSelected = idx === temp;
    });

    setQuiz(quizClone);
  };

  return (
    <div className="container quiz-detail-container">
      <div className="row quiz-top">
        <h1>
          Quiz {quizId}: {location?.state?.QuizTitle}
        </h1>
      </div>
      <div className="row quiz-content">
        <div className="quiz-left">
          {!_.isEmpty(quiz) && (
            <div className="question-block">
              <h2>Question {index + 1}</h2>
              <div className="question-image">
                {quiz[index]?.image && (
                  <img
                    src={`data:image/png;base64, ${quiz[index].image}`}
                    alt="Question"
                  />
                )}
              </div>
              <p>{quiz[index].questionDescriptions}</p>
              <div className="answer-block">
                {quiz[index].answers.map((item, idx) => (
                  <div key={idx} className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        name={`question-${quiz[index].questionId}`}
                        value={idx}
                        checked={item.isSelected}
                        onChange={() => handleAnswerChange(idx)}
                        className="form-check-input"
                      />
                      {item.description}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="quiz-right">Quiz right</div>
        <div className="quiz-footer">
          <div className="btn-footer">
            <button
              disabled={disablePrev}
              onClick={handlePrev}
              className="btn btn-secondary"
              type="button"
            >
              Prev
            </button>
            <button
              disabled={disableNext}
              onClick={handleNext}
              className="btn btn-primary"
              type="button"
            >
              Next
            </button>
            <button
              onClick={handleFinish}
              className="btn btn-warning"
              type="button"
            >
              Finish
            </button>
          </div>
        </div>
        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={data}
          quizId={quizId}
        />
      </div>
    </div>
  );
};

export default QuizDetail;
