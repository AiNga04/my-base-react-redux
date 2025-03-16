import React from "react";
import Table from "react-bootstrap/Table";

const TableQuiz = (props) => {
  const {
    listUsers,
    handleShowUpdateModal,
    handleShowViewModal,
    handleShowDeleteModal,
  } = props;

  return (
    <>
      <Table striped bordered hover size="xl">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      handleShowViewModal(user);
                    }}
                    className="btn btn-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      handleShowUpdateModal(user);
                    }}
                    type="button"
                    className="btn btn-warning mx-3"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleShowDeleteModal(user);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableQuiz;
