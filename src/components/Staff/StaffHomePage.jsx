import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { issueActions } from '../../redux/issue/issueSlice';
import { feedbackActions } from '../../redux/feedbacks/feeddbackSlice';

import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StaffHomePage = () => {
  const dispatch = useDispatch();
  const myIssuesStaff = useSelector((state) => state.issue.assignedToMe);

  const prog = myIssuesStaff.filter((issue) => issue.status === 'progress');
  const newIssues = myIssuesStaff.filter((issue) => issue.status === 'assigned');
  const closedIssues = myIssuesStaff.filter((issue) => issue.status === 'closed');
  const [feedbackData, setFeedbackData] = useState([]);

  // Monthly total issues
  const All_Issues = useSelector((state) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
  
    return state.issue.assignedToMe.filter((issue) => {
      const issueDate = new Date(issue.createdAt);
      return issueDate.getMonth() === currentMonth;
    });
  });
  
  const len = All_Issues.length;
  
  const progressIssues = len > 0 ? prog.slice(len - 4, len) : [];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  const filteredProgressIssues = prog.filter((issue) => {
    const issueDate = new Date(issue.createdAt);
    return issueDate.getMonth() === currentMonth && issue.status === 'progress';
  });

  const filteredClosedIssues = closedIssues.filter((issue) => {
    const issueDate = new Date(issue.createdAt);
    return issueDate.getMonth() === currentMonth && issue.status === 'closed';
  });

  const filteredNewIssues = newIssues.filter((issue) => {
    const issueDate = new Date(issue.createdAt);
    return issueDate.getMonth() === currentMonth && issue.status === 'assigned';
  });

  // Three lengths
  const newLeng = filteredNewIssues.length;
  const progLeng = filteredProgressIssues.length;
  const closeLeng = filteredClosedIssues.length;

  const [assignedToId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserInfo = JSON.parse(sessionStorage.getItem('authState'));
    if (storedUserInfo && storedUserInfo.user && storedUserInfo.user._id) {
      setUserId(storedUserInfo.user._id);
    }
  }, []);

  // Feedbacks
  const fetchFeedbackData = async () => {
    try {
      if (!assignedToId) return;
      const response = await axios.get(`http://localhost:8080/feedback/${assignedToId}`);
      setFeedbackData(response.data);
      dispatch(feedbackActions.setFeedbacks(response.data));
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    }
  };

  const fetchStudentIssues = async () => {
    try {
      if (!assignedToId) return;
      const response = await axios.get(`http://localhost:8080/issue/assigned-staff/${assignedToId}`);
      dispatch(issueActions.setAssignedToMe(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  // Set up interval to fetch data every second
  useEffect(() => {
    if (assignedToId) {
      fetchStudentIssues();
      fetchFeedbackData();

      const interval = setInterval(() => {
        fetchStudentIssues();
        fetchFeedbackData();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [dispatch, assignedToId]);
  
  const totalIssues = filteredNewIssues.length + filteredProgressIssues.length + filteredClosedIssues.length;

  const data = {
    labels: ['New', 'Progressing', 'Closed'],
    datasets: [
      {
        label: 'Status of Issues',
        data: [
          (filteredNewIssues.length / totalIssues) * 100,
          (filteredProgressIssues.length / totalIssues) * 100,
          (filteredClosedIssues.length / totalIssues) * 100
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)', // New
          'rgba(255, 206, 86, 0.2)', // Progress
          'rgba(75, 192, 192, 0.2)', // Closed
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)', // New
          'rgba(255, 206, 86, 1)', // Progress
          'rgba(75, 192, 192, 1)', // Closed
        ],
        borderWidth: 3,
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}%`,
        },
      },
    },
  };
  

  return (
    <div>
      <div className="issue-container md:px-32 md:py-10 md:grid md:grid-cols-2 md:gap-6">
        <div className="cards-graph">
          {/* cards grid grid-cols-3 gap-3 */}
          <div className="cards grid gap-2 md:grid md:grid-cols-3 md:gap-3">
            <Link to="/Home/staff-issue-page">
              <div className="card-1 cursor-pointer text-red-500 bg-gray-100 px-10 py-10 rounded-md flex flex-col gap-4 justify-center items-center">
                <p className="text-2xl">New</p>
                <h1 className="text-2xl">{newLeng}</h1>
              </div>
            </Link>
            <Link to="/Home/staff-issue-page">
              <div className="card-1 cursor-pointer text-green-500 bg-gray-100 px-10 py-10 rounded-md flex flex-col gap-4 justify-center items-center">
                <p className="text-2xl">Progress</p>
                <h1 className="text-2xl">{progLeng}</h1>
              </div>
            </Link>
            <Link to="/Home/staff-issue-page">
              <div className="card-1 text-blue-500 cursor-pointer bg-gray-100 px-10 py-10 rounded-md flex flex-col gap-4 justify-center items-center">
                <p className="text-2xl">Closed</p>
                <h1 className="text-2xl">{closeLeng}</h1>
              </div>
            </Link>
          </div>
          <div className="graph md:pt-32">
            <Bar data={data} options={options} className='w-full'></Bar>
          </div>
        </div>
        <div className="latest-issue border px-8 py-4">
          <div className="latest-title text-4xl font-bold pb-6">
            <p>Recent issues</p>
          </div>
          <div className="issues-list flex flex-col gap-5 py-4">
            {All_Issues.length > 0 ? (
              All_Issues.slice(0, 2).map((issue) => (
                <div className="issue-1 border p-4 rounded-md space-y-2" key={issue._id}>
                  <p>{issue.title}</p>
                   <p className="px-3">{issue.createdAt}</p>
                </div>
              ))
            ) : (
              <p>No recent issues</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default StaffHomePage;
