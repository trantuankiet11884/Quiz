import "./dashboard.scss";
import {
  BarChart,
  Line,
  LineChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";
const Dashboard = (props) => {
  return (
    <div className="dashboard-container">
      <div className="title">Dashboard</div>
      <div className="content">
        <div className="content-left">
          <div className="child">Total Users</div>
          <div className="child">Total Quizzes</div>
          <div className="child">Total Questions</div>
          <div className="child">Answers</div>
        </div>
        <div className="content-right">
          <BarChart></BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
