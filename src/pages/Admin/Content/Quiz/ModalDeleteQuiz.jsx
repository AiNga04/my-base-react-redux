import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuizById } from "../../../../services/api/QuizService";
import { toast } from "react-toastify";

function ModalDeleteQuiz(props) {
  const {
    show,
    handleClose,
    fetchQuizListWithPaginate,
    dataDelete,
    resetDeleteQuiz,
    setCurrentPage,
    LIMIT_QUIZ_LIST,
  } = props;

  const handleClickClose = () => {
    handleClose();
    resetDeleteQuiz();
  };

  const handleDeleteQuiz = async () => {
    try {
      const data = await deleteQuizById(dataDelete.id);
      if (data && data.EC === 0) toast.success(data.EM);
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
      <Modal show={show} onHide={handleClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this Quiz. Name ={" "}
          <b>{dataDelete && dataDelete.name ? dataDelete.name : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClickClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeleteQuiz}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz;
