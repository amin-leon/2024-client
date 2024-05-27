import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MeetingAndEscalate from './issueEscalationAndMeeting/ShareAndEscalateIssue';
import axios from 'axios';
import { issueActions } from '../../redux/issue/issueSlice';

function AllIssues() {
  const dispatch = useDispatch();
  const [assignedToId, setUserId] = useState(null);
  const MyIssues_Staff = useSelector((state) => state.issue.assignedToMe);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 5;

  const handleIconClick = (issueId) => {
    setSelectedIssueId(issueId);
  };

  const handleStatusUpdate = async (issueId) => {
    try {
       await axios.put(`http://localhost:8080/issue/status/${issueId}`, { status: 'progress' });
       await axios.delete(`http://localhost:8080/alerts/${assignedToId}`);
    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  };

  const handleRowClick = (issueId) => {
    setSelectedIssueId(issueId);
    handleStatusUpdate(issueId);
  }
  const handleClosePopUp = () => {
    setSelectedIssueId(null);
  };

  const filteredIssues = MyIssues_Staff.filter((issue) => {
    if (filter !== 'all' && issue.status !== filter) {
      return false;
    }
    if (selectedMonth !== 'all') {
      const issueDate = new Date(issue.createdAt);
      const issueMonth = issueDate.getMonth().toString();
      if (issueMonth !== selectedMonth) {
        return false;
      }
    }
    if (selectedYear !== 'all') {
      const issueDate = new Date(issue.createdAt);
      const issueYear = issueDate.getFullYear().toString();
      if (issueYear !== selectedYear) {
        return false;
      }
    }
    return true;
  });

  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredIssues.length / issuesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // user Id
  useEffect(() => {
    const storedUserInfo = JSON.parse(sessionStorage.getItem('authState'));
    if (storedUserInfo && storedUserInfo.user && storedUserInfo.user._id) {
      setUserId(storedUserInfo.user._id);
    } else {
      //
    }
  }, [assignedToId]);

  useEffect(() => {
    const fetchStudentIssues = async () => {
      try {
        if (assignedToId) {
          const response = await axios.get(`http://localhost:8080/issue/assigned-staff/${assignedToId}`);
          dispatch(issueActions.setAssignedToMe(response.data));
          dispatch(issueActions.setIssues(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const intervalId = setInterval(fetchStudentIssues, 1000);
  
    return () => clearInterval(intervalId);
  }, [dispatch, assignedToId]);
  

  return (
    <div>
      {/* mb-4 flex items-center space-x-4 */}
      <div className="mb-4 flex">
        <select
          className="border p-2 rounded-md w-64"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="new">Pending</option>
          <option value="assigned">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <select
          id="monthOption"
          name="monthOption"
          className="border p-2 rounded-md w-64"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="all">All Months</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
        <select
          id="yearOption"
          name="yearOption"
          className="border p-2 rounded-md w-64"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="all">All Years</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          {/* Add more years as needed */}
        </select>
      </div>
      {currentIssues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <div className='overflow-x-scroll'>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-300 text-gray-700 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Priority</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentIssues.map((issue, index) => (
                <tr
                  key={issue._id}
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => handleRowClick(issue._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <Link to={`/Home/manage-issue/${issue._id}/${issue.reporter}`} key={Date.now()}>
                      <div className="flex gap-1">
                        <div>
                          <p className="pb-2">{issue.title}</p>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-6 text-left  whitespace-nowrap">
                    {issue.status}
                  </td>
                  <td className="py-3 px-6 text-left text-red-500 whitespace-nowrap font-extrabold">
                    {issue.priority}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {issue.status ==="closed" && (
                        <button
                            onClick={() => handleIconClick(issue._id)}
                            className="cursor-pointer text-blue-500 text-sx font-semibold"
                          >
                           Solved
                        </button>
                      )}
                      {issue.status !=="closed" && (
                        <button
                            onClick={() => handleIconClick(issue._id)}
                            className="cursor-pointer text-[#1F3365] text-sx font-semibold"
                          >
                           Escalate
                        </button>
                      )}
                      {selectedIssueId === issue._id && (
                        <MeetingAndEscalate
                          onClose={handleClosePopUp}
                          issueId={selectedIssueId}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end">
            <nav>
              <ul className="pagination flex space-x-2">
                {pageNumbers.map((number) => (
                  <li key={Date.now()} className="page-item">
                    <button
                      onClick={() => handlePageClick(number)}
                      className={`${
                        currentPage === number ? 'bg-[#1F3365] text-white' : 'hover:bg-blue-300'
                      } px-3 py-1 border rounded-md`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllIssues;
