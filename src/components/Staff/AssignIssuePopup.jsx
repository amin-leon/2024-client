import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { issueActions } from '../../redux/issue/issueSlice';
import { useNavigate } from 'react-router-dom';


function AssignIssuePopup({ isOpen, onClose, issueId, senderId }) {
  const navigate = useNavigate()
  const [assignedTo, setSelectedStaff] = useState('');
  const [priority, setPriority] = useState('');
  const [allStaffs, setAllStaffs] = useState([])
  const dispatch = useDispatch()
  const staff='Staff';
  const status = 'assigned'

  useEffect(() => {
    const fetchIssuesData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/staffs/'+staff);
        setAllStaffs(response.data)
      } catch (error) {
        console.log(error)
      }
    };
  
    fetchIssuesData();
  }, []);

    // token
    const token = sessionStorage.getItem('authToken');

    if (!token) {
      console.error('No token found');
      return;
    }

// update 
  const handleAssignIssue = async(e) => {
    e.preventDefault()
    await axios.put(`http://localhost:8080/issue/assign/${issueId}`, {assignedTo, senderId, priority, status, issueId}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(()=>{
        dispatch(issueActions.removeAssignedIssue({issueId}))
        navigate('/Home/middleman-issue-page');
    })
    .catch((error)=>{
        console.log(error)
    })
    const response = await axios.get('http://localhost:8080/issue/open');
    dispatch(issueActions.setIssues(response.data));
    onClose();
  };

  return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-70 bg-gray-600 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white p-10 shadow-md rounded-lg w-[500px] h-[400px] flex justify-center flex-col">
            <h2 className="text-xl font-semibold mb-4">Assign Issue to staff</h2>
            <label htmlFor="staffSelect" className="block mb-2">Select a staff:</label>
            <select
            id="staffSelect"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={assignedTo}
            onChange={(e) => setSelectedStaff(e.target.value)}
            >
                <option value="">Select staff</option>
                {allStaffs.map((s)=> <option key={s._id} value={s._id}>{s.position}</option>)}
            </select>
            <div className="div mt-4">
            <label htmlFor="staffSelect" className="block mb-2">Priority</label>
              <select
              required
              id="staffSelect"
              name="priority"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              >
                  <option value="">Select</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Low">Low</option>
              </select>
            </div>
            <div className="mt-8">
            <button
                className="bg-[#1F3365] text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
                onClick={handleAssignIssue}
            >
                Assign to
            </button>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={onClose}
            >
                No need
            </button>
            </div>
        </div>
        </div>
  );
}

export default AssignIssuePopup;