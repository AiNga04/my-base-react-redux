import React, { useEffect, useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import TableUser from "./TableUser";
import { GetListUsers } from "../../../services/api/UserService";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = () => {
  const [listUsers, setListUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleShowUpdateModal = (user) => {
    setDataUpdate(user);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await GetListUsers();
      setListUsers(response.DT);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  return (
    <>
      <div className="manage-users">Manage User</div>
      <div className="add-users">
        <button
          className="btn btn-primary"
          variant="primary"
          onClick={handleShowCreateModal}
        >
          Add User
        </button>
      </div>
      <div className="table-users">
        <TableUser
          listUsers={listUsers}
          handleShowUpdateModal={handleShowUpdateModal}
        />
      </div>

      <ModalCreateUser
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        fetchUserList={fetchUserList}
      />
      <ModalUpdateUser
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        fetchUserList={fetchUserList}
        dataUpdate={dataUpdate}
      />
    </>
  );
};

export default ManageUser;
