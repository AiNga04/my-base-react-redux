import React, { useEffect, useState } from "react";
import ModalCreateQuiz from "./ModalCreateQuiz";
import TableQuizPaginate from "./TableQuizPaginate";
import {
  getListQuiz,
  postAssignQuizToUser,
} from "../../../../services/api/QuizService";
import { MdLibraryAdd } from "react-icons/md";
import ModalViewQuiz from "./ModalViewQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import Accordion from "react-bootstrap/Accordion";
import { getListUsers } from "../../../../services/api/UserService";
import { toast } from "react-toastify";
import "./ManageQuiz.scss";
import QuizQA from "../Question/QuizQA";

const ManageQuiz = () => {
  const LIMIT_QUIZ_LIST = 7;
  const [listQuizzes, setListQuizzes] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [quiz, setQuiz] = useState("");
  const [user, setUser] = useState("");
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

  const resetUpdateQuiz = () => setDataUpdate({});
  const resetViewQuiz = () => setDataView({});
  const resetDeleteQuiz = () => setDataDelete({});

  useEffect(() => {
    fetchUserList();
    fetchQuizListWithPaginate(1);
  }, []);

  const fetchQuizListWithPaginate = async () => {
    try {
      const data = await getListQuiz();
      setListQuizzes(data.DT || []);
    } catch (error) {
      toast.error("Failed to fetch quizzes");
    }
  };

  const fetchUserList = async () => {
    try {
      const response = await getListUsers();
      setListUsers(response.DT || []);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!quiz) newErrors.quiz = "Please select a quiz";
    if (!user) newErrors.user = "Please select a user";
    return Object.keys(newErrors).length === 0;
  };

  const handleAssign = async () => {
    if (!validateFields()) {
      toast.error("Please select both quiz and user");
      return;
    }

    let res = await postAssignQuizToUser(quiz, user);
    if (res && res.EC === 0) toast.success(res.EM);
    if (res && res.EC !== 0) toast.error(res.EM);
    setQuiz("");
    setUser("");
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="manage-quiz">Manage Quizzes</div>

            <div className="add-quiz">
              <button
                className="btn btn-add-quiz"
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
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Question</Accordion.Header>
          <Accordion.Body>
            <QuizQA></QuizQA>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign to User</Accordion.Header>
          <Accordion.Body>
            <div className="manage-quiz">Assign Quiz to User</div>
            <div className="assign-container">
              <div className="assign-top">
                <div className="select-quiz">
                  <label htmlFor="quiz">Select Quiz:</label>
                  <select
                    name="quiz"
                    id="quiz"
                    value={quiz}
                    onChange={(e) => setQuiz(e.target.value)}
                  >
                    <option value="">Select a quiz</option>
                    {listQuizzes.map((quiz) => (
                      <option key={quiz.id} value={quiz.id}>
                        {`${quiz.id} - ${quiz.name}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="select-user">
                  <label htmlFor="user">Select User:</label>
                  <select
                    name="user"
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  >
                    <option value="">Select a user</option>
                    {listUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {`${user.id} - ${user.username} - ${user.email}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="assign-footer">
                <button className="btn btn-warning" onClick={handleAssign}>
                  Assign
                </button>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

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
        reserUpdateQuiz={resetUpdateQuiz}
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
