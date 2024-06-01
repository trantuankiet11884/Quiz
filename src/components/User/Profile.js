import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getHistory, postChangePassword } from "../../services/apiService";
import { toast } from "react-toastify";
import moment from "moment";
import "./profile.scss";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Profile = () => {
  const account = useSelector((state) => state.user.account);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [history, setHistory] = useState([]);
  const [view, setView] = useState("history");
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();

  const historyPerPage = 4;
  const pagesVisited = pageNumber * historyPerPage;

  const pageCount = Math.ceil(history.length / historyPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const fetchHistory = async () => {
    const res = await getHistory();
    if (res && res.EC === 0) {
      setHistory(res.DT.data);
    } else {
      toast.error("Failed to fetch history.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please enter both current and new passwords.");
      return;
    }

    const res = await postChangePassword(currentPassword, newPassword);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setCurrentPassword("");
      setNewPassword("");
    } else {
      toast.error(res.EM);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar">
          {account.image !== "" ? (
            <img src={`data:image/jpeg;base64,${account.image}`} alt="avatar" />
          ) : (
            <></>
          )}
        </div>
        <div className="profile-info">
          <div className="username">{account.username}</div>
        </div>
        <button className="backButton" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
      <div className="view-selector">
        <button
          className={`view-button ${view === "history" ? "active" : ""}`}
          onClick={() => handleViewChange("history")}
        >
          History
        </button>
        <button
          className={`view-button ${
            view === "change-password" ? "active" : ""
          }`}
          onClick={() => handleViewChange("change-password")}
        >
          Change Password
        </button>
      </div>
      {view === "change-password" && (
        <div className="change-password">
          <h2>Change Password</h2>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button onClick={handleChangePassword}>Change Password</button>
        </div>
      )}
      {view === "history" && (
        <div className="history">
          <h2>History</h2>
          <table>
            <thead>
              <tr>
                <th>Quiz Name</th>
                <th>Total Questions</th>
                <th>Total Correct</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history
                .slice(pagesVisited, pagesVisited + historyPerPage)
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.quizHistory.name}</td>
                    <td>{item.total_questions}</td>
                    <td>{item.total_correct}</td>
                    <td>
                      {moment(item.createdAt).format("HH:mm - YYYY-MM-DD")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="mt-2 paginate">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
