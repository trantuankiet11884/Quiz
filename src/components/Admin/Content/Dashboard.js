import { useEffect, useState } from "react";
import { getOverview } from "../../../services/apiService";
import "./dashboard.scss";
import {
  ResponsiveContainer,
  BarChart,
  Line,
  LineChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { toast } from "react-toastify";
const Dashboard = (props) => {
  const [data, setData] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  const fetchOverview = async () => {
    const rs = await getOverview();

    if (rs && rs.EC === 0) {
      setData(rs.DT);

      let Qz = 0,
        Qs = 0,
        As = 0;
      Qz = rs?.DT?.others?.countQuiz ?? 0;
      Qs = rs?.DT?.others?.countQuestions ?? 0;
      As = rs?.DT?.others?.countAnswers ?? 0;

      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qz: Qs,
        },
        {
          name: "Answers",
          Qz: As,
        },
      ];

      setDataChart(data);
    } else {
      toast.error(rs.EM);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="title">Dashboard</div>
      <div className="content">
        <div className="content-left">
          <div className="child">
            <span className="text-1">Total Users</span>
            <span className="text-2">
              {data && data.users && data.users.total ? (
                <>{data.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Quizzes</span>
            <span className="text-2">
              {data && data.others && data.others.countQuiz ? (
                <>{data.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Questions</span>
            <span className="text-2">
              {" "}
              {data && data.others && data.others.countQuestions ? (
                <>{data.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Answers</span>
            <span className="text-2">
              {data && data.others && data.others.countAnswers ? (
                <>{data.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="content-right">
          <ResponsiveContainer width="95%" height={"100%"}>
            <BarChart data={dataChart}>
              <XAxis dataKey={"name"} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
