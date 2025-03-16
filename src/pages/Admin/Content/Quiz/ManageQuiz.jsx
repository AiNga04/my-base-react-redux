import React, { useEffect, useState } from "react";
import ModalCreateQuiz from "./ModalCreateQuiz";
import TableQuizPaginate from "./TableQuizPaginate";
import { getListQuiz } from "../../../../services/api/QuizService";
import { MdLibraryAdd } from "react-icons/md";
import ModalViewQuiz from "./ModalViewQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import "./ManageQuiz.scss";

const ManageQuiz = () => {
  const LIMIT_QUIZ_LIST = 7;
  const [listQuizzes, setListQuizzes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleShowUpdateModal = (quiz) => {
    setDataUpdate(quiz);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleShowViewModal = (quiz) => {
    setDataView(quiz);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  const handleShowDeleteModal = (quiz) => {
    setDataDelete(quiz);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const reserUpdateQuiz = () => {
    setDataUpdate({});
  };

  const resetViewQuiz = () => {
    setDataView({});
  };

  const resetDeleteQuiz = () => {
    setDataDelete({});
  };

  useEffect(() => {
    fetchQuizListWithPaginate(1);
  }, []);

  const fetchQuizListWithPaginate = async (index) => {
    try {
      const data = await getListQuiz();
      setListQuizzes(data.DT);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  return (
    <>
      <div className="manage-quiz">Manage Quizzes</div>
      <div className="add-quiz">
        <button
          className="btn btn-add-quiz"
          variant="primary"
          onClick={handleShowCreateModal}
        >
          Add Quiz
          <MdLibraryAdd />
        </button>
      </div>
      <div className="table-quiz">
        <TableQuizPaginate
          listQuizzes={listQuizzes}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowViewModal={handleShowViewModal}
          handleShowDeleteModal={handleShowDeleteModal}
          itemsPerPage={LIMIT_QUIZ_LIST}
        />
      </div>
      <ModalCreateQuiz
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        fetchQuizListWithPaginate={fetchQuizListWithPaginate}
        setCurrentPage={setCurrentPage}
        LIMIT_QUIZ_LIST={LIMIT_QUIZ_LIST}
      />
      <ModalUpdateQuiz
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        fetchQuizListWithPaginate={fetchQuizListWithPaginate}
        dataUpdate={dataUpdate}
        reserUpdateQuiz={reserUpdateQuiz}
        currentPage={currentPage}
        LIMIT_QUIZ_LIST={LIMIT_QUIZ_LIST}
      />
      <ModalViewQuiz
        show={showViewModal}
        handleClose={handleCloseViewModal}
        fetchQuizListWithPaginate={fetchQuizListWithPaginate}
        dataView={dataView}
        resetViewQuiz={resetViewQuiz}
      />
      <ModalDeleteQuiz
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        fetchQuizListWithPaginate={fetchQuizListWithPaginate}
        dataDelete={dataDelete}
        resetDeleteQuiz={resetDeleteQuiz}
        setCurrentPage={setCurrentPage}
        LIMIT_QUIZ_LIST={LIMIT_QUIZ_LIST}
      />
    </>
  );
};

export default ManageQuiz;
