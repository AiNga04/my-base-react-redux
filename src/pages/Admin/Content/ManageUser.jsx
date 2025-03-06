import React, { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
// import TableUser from "./TableUser";
// import { getListUsers } from "../../../services/api/UserService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { getUserWithPaginate } from "../../../services/api/UserService";
import "./ManageUser.scss";
import { FaUserPlus } from "react-icons/fa6";

const ManageUser = () => {
  const LIMIT_USER_LIST = 7;
  const [listUsers, setListUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleShowUpdateModal = (user) => {
    setDataUpdate(user);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleShowViewModal = (user) => {
    setDataView(user);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  const handleShowDeleteModal = (user) => {
    setDataDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const reserUpdateUser = () => {
    setDataUpdate({});
  };

  const resetViewUser = () => {
    setDataView({});
  };

  const resetDeleteUser = () => {
    setDataDelete({});
  };

  useEffect(() => {
    // fetchUserList();
    fetchUserListWithPaginate(1);
  }, []);

  // const fetchUserList = async () => {
  //   try {
  //     const response = await getListUsers();
  //     setListUsers(response.DT);
  //   } catch (error) {
  //     console.error("Error fetching user list:", error);
  //   }
  // };

  const handlePageClick = (event) => {
    fetchUserListWithPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
  };

  const fetchUserListWithPaginate = async (index) => {
    try {
      const data = await getUserWithPaginate(index, LIMIT_USER_LIST);
      setListUsers(data.DT.users);
      setPageCount(data.DT.totalPages);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  return (
    <>
      <div className="manage-users">Manage User</div>
      <div className="add-users">
        <button
          className="btn btn-add-user"
          variant="primary"
          onClick={handleShowCreateModal}
        >
          Add User
          <FaUserPlus />
        </button>
      </div>
      <div className="table-users">
        {/* <TableUser
          listUsers={listUsers}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowViewModal={handleShowViewModal}
          handleShowDeleteModal={handleShowDeleteModal}
        /> */}
        <TableUserPaginate
          listUsers={listUsers}
          handleShowUpdateModal={handleShowUpdateModal}
          handleShowViewModal={handleShowViewModal}
          handleShowDeleteModal={handleShowDeleteModal}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <ModalCreateUser
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        fetchUserListWithPaginate={fetchUserListWithPaginate}
        setCurrentPage={setCurrentPage}
        LIMIT_USER_LIST={LIMIT_USER_LIST}
      />
      <ModalUpdateUser
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        fetchUserListWithPaginate={fetchUserListWithPaginate}
        dataUpdate={dataUpdate}
        reserUpdateUser={reserUpdateUser}
        currentPage={currentPage}
        LIMIT_USER_LIST={LIMIT_USER_LIST}
      />
      <ModalViewUser
        show={showViewModal}
        handleClose={handleCloseViewModal}
        fetchUserListWithPaginate={fetchUserListWithPaginate}
        dataView={dataView}
        resetViewUser={resetViewUser}
      />
      <ModalDeleteUser
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        fetchUserListWithPaginate={fetchUserListWithPaginate}
        dataDelete={dataDelete}
        resetDeleteUser={resetDeleteUser}
        setCurrentPage={setCurrentPage}
        LIMIT_USER_LIST={LIMIT_USER_LIST}
      />
    </>
  );
};

export default ManageUser;
