import React from "react";
import Table from "react-bootstrap/Table";

const TableUser = (props) => {
  const { listUsers, handleShowUpdateModal } = props;

  return (
    <>
      <Table striped bordered hover size="xl">
        <thead>
          <tr>
            <th>No</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
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
                  <button type="button" className="btn btn-info">
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
                  <button type="button" className="btn btn-danger">
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableUser;
