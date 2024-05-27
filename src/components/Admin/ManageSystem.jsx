import React, { useEffect } from 'react';
import { AiOutlineIssuesClose } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authActions } from '../../redux/auth/authSlice';
import { issueActions } from '../../redux/issue/issueSlice';
import { codesActions } from '../../redux/request_codes/codesSlice';
import { GrChannel } from "react-icons/gr";

function ManageSystem() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const pendingUsers = users ? users.filter((user) => user.approvalStatus === 'pending' && user.verificationCode === 0) : [];
  const pendingUsersCount = pendingUsers.length;

  const dummyCodeRequests = useSelector((state) => state.codes.codeRequests.filter((request) => request.status === 'Pending'));
  const codes = dummyCodeRequests.length;

  const unassignedIssues = useSelector((state) => state.issue.unassignedIssues);
  const total_number_issues = unassignedIssues.length;

  const fetchData = async () => {
    try {
      const [codesResponse, usersResponse, issuesResponse] = await Promise.all([
        axios.get('http://localhost:8080/api/code/all-code-requests'),
        axios.get('http://localhost:8080/auth/users'),
        axios.get('http://localhost:8080/issue/all-issues')
      ]);

      dispatch(codesActions.setCodeRequests(codesResponse.data));
      dispatch(authActions.setAllUsers(usersResponse.data));
      dispatch(authActions.setUsers(usersResponse.data));
      dispatch(issueActions.setIssues(issuesResponse.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up an interval to fetch data every second
    const interval = setInterval(fetchData, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className='bg-gray-100'>
      <div className="md:grid md:grid-cols-3 md:grid-rows-1 md:gap-4 md:p-32">
        <Link to="/Home/admin/users">
          <div className='bg-white flex flex-col justify-center items-center gap-2 p-10'>
            <p><FiUsers className='text-6xl text-[#1F3365]'/></p>
            <p className='text-xl text-red-500'>{pendingUsersCount}</p>
            <p className='text-2xl'>Manage Users</p>
          </div>
        </Link>
        <Link to="/Home/middleman-issue-page">
          <div className='bg-white flex flex-col justify-center items-center gap-2 p-10'>
            <p><AiOutlineIssuesClose className='text-6xl text-[#1F3365]'/></p>
            <p className='text-xl text-red-500'>{total_number_issues}</p>
            <p className='text-2xl'>Pending Issues</p>
          </div>
        </Link>
        <Link to="requests">
          <div className='bg-white flex flex-col justify-center items-center gap-2 p-10'>
            <p><GrChannel className='text-6xl text-[#1F3365]'/></p>
            <p className='text-xl text-red-500'>{codes}</p>
            <p className='text-2xl text-center'>Private Channels</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ManageSystem;
