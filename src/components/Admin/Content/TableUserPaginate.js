import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
  const {
    listUsers,
    handleClickBtnUpdateUser,
    handleClickDeleteUser,
    fetchAllUsersWithPaginate,
    pageCount,
  } = props;

  const handlePageClick = (e) => {
    fetchAllUsersWithPaginate(+e.selected + 1);
  };

  return (
    <>
      <table className="table table-hover ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="">
                  <button className="btn btn-primary">View</button>
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => handleClickBtnUpdateUser(user)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickDeleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td className="text-center " colSpan={"4"}>
                Not Found Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center align-items-center">
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
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
