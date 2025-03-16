import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./ModalCreateQuiz.scss";
import { toast } from "react-toastify";
import { postCreateNewQuiz } from "../../../../services/api/QuizService";

function ModalCreateQuiz(props) {
  const {
    show,
    handleClose,
    fetchQuizListWithPaginate,
    setCurrentPage,
    LIMIT_QUIZ_LIST,
  } = props;

  const handleClickClose = () => {
    setName("");
    setDescription("");
    setDifficulty("EASY");
    setImage(null);
    setImagePreview(null);
    setErrors({});
    handleClose();
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) {
          error = "name is required";
        }
        break;
      case "description":
        if (!value) {
          error = "description is required";
        }
        break;
      case "confirmdescription":
        if (value !== description) {
          error = "descriptions do not match";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitUser = async () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("name", name);
    formData.append("difficulty", difficulty);
    formData.append("quizImage", image);

    try {
      const data = await postCreateNewQuiz(
        description,
        name,
        difficulty,
        image
      );
      if (data && data.EC === 0) toast.success(data.EM);
      console.log(data);
      if (data && data.EC !== 0) toast.error(data.EM);
      setCurrentPage(1);
      fetchQuizListWithPaginate(1, LIMIT_QUIZ_LIST);
      handleClickClose();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClickClose}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleBlur}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="description"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={handleBlur}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom05">
                <Form.Label>Difficulty</Form.Label>
                <br />
                <select
                  name="difficulty"
                  id="difficulty"
                  className="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
                </select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom06">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  required
                  type="file"
                  onChange={handleChangeImage}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div
                as={Col}
                md="12"
                controlId="validationCustom07"
                className="image-preview"
              >
                <div className="preview-desc">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    "Preview Image"
                  )}
                </div>
              </div>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClickClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitUser}>
            Save Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateQuiz;
