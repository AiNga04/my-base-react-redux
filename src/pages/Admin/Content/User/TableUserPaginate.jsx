import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import React from "react";
import "./ManageUser.scss";

const TableUserPaginate = (props) => {
  const {
    listUsers,
    handleShowUpdateModal,
    handleShowViewModal,
    handleShowDeleteModal,
    pageCount,
    handlePageClick,
    currentPage,
  } = props;

  return (
    <>
      <Table striped bordered hover size="md" className="table-user">
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
                  <button
                    type="button"
                    onClick={() => {
                      handleShowViewModal(user);
                    }}
                    className="btn btn-view"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      handleShowUpdateModal(user);
                    }}
                    type="button"
                    className="btn btn-update mx-3"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleShowDeleteModal(user);
                    }}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div className="user-pagination">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
