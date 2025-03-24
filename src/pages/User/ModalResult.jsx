import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalResult.scss";
import ModalShowResult from "./ModalShowResult";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;
  const [isShowModalShowResult, setIsShowModalShowResult] = useState(false);
  const navigate = useNavigate();

  const handleClickClose = () => {
    navigate("/users/quiz");
    handleClose();
  };

  const handleClickShow = () => {
    setIsShowModalShowResult(true);
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Result</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body ">
          <p>
            Your score:{" "}
            {(
              (dataModalResult.countCorrect / dataModalResult.countTotal) *
              10
            ).toFixed(2)}
          </p>
          <p>Total questions: {dataModalResult.countTotal}</p>
          <p>Correct answers: {dataModalResult.countCorrect}</p>
          <p>
            Incorrect answers:{" "}
            {dataModalResult.countTotal - dataModalResult.countCorrect}
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClickShow}>
            Show answer
          </Button>
          <Button variant="danger" onClick={handleClickClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalShowResult
        show={isShowModalShowResult}
        setShow={setIsShowModalShowResult}
        dataModalResult={dataModalResult}
      />
    </>
  );
};

export default ModalResult;
