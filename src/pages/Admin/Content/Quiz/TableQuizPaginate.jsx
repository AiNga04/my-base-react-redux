import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import React, { useState, useEffect } from "react";
import "./ManageQuiz.scss";

const TableQuizPaginate = (props) => {
  const {
    listQuizzes,
    handleShowUpdateModal,
    handleShowViewModal,
    handleShowDeleteModal,
    itemsPerPage,
  } = props;

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(listQuizzes.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listQuizzes.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, listQuizzes]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listQuizzes.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Table striped bordered hover size="md" className="table-user">
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
          {currentItems &&
            currentItems.length > 0 &&
            currentItems.map((user, index) => (
              <tr key={user.id}>
                <td>{itemOffset + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.description}</td>
                <td>{user.difficulty}</td>
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
          forcePage={itemOffset / itemsPerPage}
        />
      </div>
    </>
  );
};

export default TableQuizPaginate;
