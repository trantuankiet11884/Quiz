const TableUser = (props) => {
  const { listUsers, handleClickBtnUpdateUser } = props;
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
                  <button className="btn btn-danger">Delete</button>
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
    </>
  );
};

export default TableUser;
