import React, { useState, useEffect } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";
import ModalShowPreviewImage from "./ModalShowPreviewImage";
import "./ManageQuestion.scss";
import { getListQuiz } from "../../../../services/api/QuizService";
import {
  postCreateQuestion,
  postCreateAnswer,
} from "../../../../services/api/QuestionService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ManageQuestion = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState("Quiz");
  const [questions, setQuestions] = useState([]);
  const [previewImages, setPreviewImages] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [listQuiz, setListQuiz] = useState([]);
  const [errors, setErrors] = useState({});

  // Khởi tạo câu hỏi mặc định khi component mount
  useEffect(() => {
    const initQuestion = [
      {
        id: uuidv4(),
        description: "",
        imageFile: null,
        imageName: "",
        answer: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      },
    ];
    setQuestions(initQuestion);
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getListQuiz();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((quiz) => ({
        value: quiz.id,
        label: quiz.description,
      }));
      setListQuiz(newQuiz);
    }
  };

  // Thêm câu hỏi mới
  const handleAddQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      description: "",
      imageFile: null,
      imageName: "",
      answer: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  // Xóa câu hỏi
  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    setPreviewImages((prev) => {
      const updatedPreviews = { ...prev };
      delete updatedPreviews[id];
      return updatedPreviews;
    });
  };

  // Thêm câu trả lời cho câu hỏi
  const handleAddAnswer = (questionId) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          answer: [
            ...question.answer,
            { id: uuidv4(), description: "", isCorrect: false },
          ],
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Xóa câu trả lời
  const handleRemoveAnswer = (questionId, answerId) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          answer: question.answer.filter((a) => a.id !== answerId),
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Cập nhật nội dung câu hỏi
  const handleQuestionChange = (id, field, value) => {
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, [field]: value } : question
    );
    setQuestions(updatedQuestions);
  };

  // Cập nhật nội dung câu trả lời
  const handleAnswerChange = (questionId, answerId, field, value) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          answer: question.answer.map((answer) =>
            answer.id === answerId ? { ...answer, [field]: value } : answer
          ),
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Xử lý upload hình ảnh và tạo preview
  const handleImageChange = (questionId, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedQuestions = questions.map((question) =>
        question.id === questionId
          ? { ...question, imageFile: file, imageName: file.name }
          : question
      );
      setQuestions(updatedQuestions);

      const previewUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => ({
        ...prev,
        [questionId]: previewUrl,
      }));
    }
  };

  // Đánh dấu câu trả lời đúng
  const handleCorrectAnswer = (questionId, answerId) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          answer: question.answer.map((answer) => ({
            ...answer,
            isCorrect: answer.id === answerId,
          })),
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  // Mở modal khi nhấp vào hình ảnh preview
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    validateField(id, value);
  };

  const validateField = (id, value) => {
    let error = "";
    const [type, qIndex, aIndex] = id.split("-");

    if (type === "question") {
      const questionIndex = parseInt(qIndex);
      if (!value.trim()) {
        error = "Question description is required";
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`question-${questionIndex}`]: error,
      }));
    } else if (type === "answer") {
      const questionIndex = parseInt(qIndex);
      const answerIndex = parseInt(aIndex);
      if (!value.trim()) {
        error = "Answer description is required";
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`answer-${questionIndex}-${answerIndex}`]: error,
      }));
    }
  };

  // Kiểm tra dữ liệu trước khi gửi
  const validateQuestions = () => {
    let errors = {};
    let isValid = true;

    questions.forEach((question, qIndex) => {
      if (!question.description) {
        isValid = false;
        errors[`question-${qIndex}`] = "Question description is required";
      }

      question.answer.forEach((answer, aIndex) => {
        if (!answer.description) {
          isValid = false;
          errors[`answer-${qIndex}-${aIndex}`] =
            "Answer description is required";
        }
      });
    });

    setErrors(errors);
    return isValid;
  };

  const handleSubmitQuestion = async (question) => {
    if (!validateQuestions()) {
      toast.error("Please fill in all required fields");
      return;
    }

    let isTrue = false;

    await Promise.all(
      question.map(async (question) => {
        const q = await postCreateQuestion(
          +quiz,
          question.description,
          question.imageFile
        );

        await Promise.all(
          question.answer.map(async (answer) => {
            const a = await postCreateAnswer(
              answer.description,
              answer.isCorrect,
              q.DT.id
            );
            if (a.EC === 0) {
              isTrue = true;
            } else {
              isTrue = false;
            }
          })
        );
      })
    );

    if (isTrue) {
      navigate(`/quiz/${quiz}`);
      toast.success("Create questions successfully!");
    } else {
      toast.error("Failed to create questions");
    }
  };

  return (
    <div className="questions-container">
      <div className="questions-header">
        <h1>Manage Question Page</h1>
      </div>
      <div className="questions-content">
        <div className="header">
          <div>
            <label htmlFor="quiz">Select Quiz:</label>
          </div>
          <div>
            <select
              name="quiz"
              id="quiz"
              className="quiz"
              value={quiz}
              onChange={(e) => setQuiz(e.target.value)}
            >
              {listQuiz.map((quiz, index) => {
                return (
                  <option key={index} value={quiz.value}>
                    {quiz.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="content">
          {questions.map((question, qIndex) => (
            <div key={question.id} className="question-item">
              <div className="question-section">
                <label htmlFor={`question-${qIndex}`}>Question</label>
                <input
                  className={errors[`question-${qIndex}`] ? "input-error" : ""}
                  onBlur={handleBlur}
                  type="text"
                  id={`question-${qIndex}`}
                  value={question.description}
                  onChange={(e) =>
                    handleQuestionChange(
                      question.id,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Enter question"
                />
                {errors[`question-${qIndex}`] && (
                  <p className="error">{errors[`question-${qIndex}`]}</p>
                )}

                <label htmlFor={`image-${qIndex}`}>Image</label>
                <input
                  type="file"
                  id={`image-${qIndex}`}
                  onChange={(e) => handleImageChange(question.id, e)}
                />

                <div className="preview-desc">
                  {previewImages[question.id] ? (
                    <img
                      src={previewImages[question.id]}
                      alt="Preview"
                      className="preview-image"
                      onClick={() => openModal(previewImages[question.id])}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <span className="preview-placeholder">Preview Image</span>
                  )}
                </div>

                <div className="controls">
                  <button
                    className="add-question-btn"
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </button>
                  {questions.length > 1 && (
                    <button
                      className="remove-question-btn"
                      onClick={() => handleRemoveQuestion(question.id)}
                    >
                      Remove Question
                    </button>
                  )}
                </div>
              </div>

              <div className="answers-section">
                <h4>Answers</h4>
                {question.answer.map((answer, aIndex) => (
                  <div key={answer.id} className="answer-item">
                    <div className="answer-top">
                      <input
                        className={
                          errors[`answer-${qIndex}-${aIndex}`]
                            ? "input-error"
                            : ""
                        }
                        onBlur={handleBlur}
                        type="text"
                        id={`answer-${qIndex}-${aIndex}`}
                        value={answer.description}
                        onChange={(e) =>
                          handleAnswerChange(
                            question.id,
                            answer.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Enter answer"
                      />
                      <label>
                        <input
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={() =>
                            handleCorrectAnswer(question.id, answer.id)
                          }
                        />{" "}
                        Correct
                      </label>
                      <span
                        className="remove-answer"
                        onClick={() =>
                          handleRemoveAnswer(question.id, answer.id)
                        }
                      >
                        <CiCircleRemove size={25} color="red" />
                      </span>
                    </div>
                    <div className="answer-footer">
                      {errors[`answer-${qIndex}-${aIndex}`] && (
                        <p className="error">
                          {errors[`answer-${qIndex}-${aIndex}`]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  className="add-answer-btn"
                  onClick={() => handleAddAnswer(question.id)}
                >
                  Add Answer
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="save-btn"
          onClick={() => handleSubmitQuestion(questions)}
        >
          Save Questions
        </button>
      </div>

      {/* Sử dụng component ModalShowPreviewImage */}
      <ModalShowPreviewImage
        isOpen={isModalOpen}
        imageUrl={selectedImage}
        onClose={closeModal}
      />
    </div>
  );
};

export default ManageQuestion;
