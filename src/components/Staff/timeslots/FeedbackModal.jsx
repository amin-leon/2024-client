// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';


// const FeedbackModal = ({ feedback, onClose, onDelete }) => {

//     // logged in user
//     const userInfo = useSelector((state) => state.auth.user);
//     const userId = userInfo._id;

//     const staff = 'Staff';
//     const [assignedTo, setSelectedStaff] = useState('');
//     const [allStaffs, setAllStaffs] = useState([]);

//     // filter my id
//     const staffs = allStaffs.filter((staff) => staff._id !==userId)


//     useEffect(() => {
//         const fetchIssuesData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/auth/staffs/${staff}`);
//                 setAllStaffs(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchIssuesData();
//     }, []);

//     const handleAssignTo = async () => {
//         try {
//             if (feedback?.issueId && assignedTo) {
//                 const response = await axios.put(`http://localhost:8080/feedback/assign/${feedback.issueId}/${assignedTo}`);
//                 onDelete(feedback._id); // Delete the feedback from the list
//                 window.location.href = 'http://localhost:3000/Home/staff-home';
//             } else {
//                 console.log('Invalid feedback or assignedTo value', feedback);
//             }
//         } catch (error) {
//             console.log('Error assigning to staff:', error);
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:8080/feedback/${feedback._id}`);
//             onDelete(feedback._id);
//             alert("Deleted done")
//         } catch (error) {
//             console.log('Error deleting feedback:', error);
//         }
//     };

//     return (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
//             <div className="bg-white rounded-md shadow-lg" style={{ width: '50%', height: '50%' }}>
//                 <div className="p-8 h-full flex flex-col justify-between">
//                     <div>
//                         <h2 className="text-xl font-semibold mb-2">{feedback?.issueTitle}</h2>
//                         <p className="text-gray-600 mb-4">{feedback?.feedbackText}</p>
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center">
//                                 <img
//                                     src={'http://localhost:8080/'+feedback.reporterImage}
//                                     alt="reporter_image"
//                                     className="w-8 h-8 rounded-full mr-2"
//                                 />
//                                 <span className="text-gray-700">{feedback?.reporterName}</span>
//                             </div>
//                             <span className="text-gray-500">Higher: {feedback?.wantToGoHigher ? "Yes" : "No"}</span>
//                         </div>
//                     </div>
//                     {feedback?.wantToGoHigher && (
//                         <select
//                             id="staffSelect"
//                             className="w-full p-2 border border-gray-300 rounded-lg"
//                             value={assignedTo}
//                             onChange={(e) => setSelectedStaff(e.target.value)}
//                         >
//                             <option value="">Select staff</option>
//                             {staffs.map((s) => <option key={s._id} value={s._id}>{s.position}</option>)}
//                         </select>
//                     )}
//                     <div>
//                         <button className="mt-4 text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600" onClick={onClose}>Close</button>
//                         {feedback?.wantToGoHigher && (
//                             <button className="mt-4 text-white bg-blue-500 px-4 py-2 rounded hover:bg-black" onClick={handleAssignTo}>Assign To</button>
//                         )}
//                         <button className="mt-2 text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600" onClick={handleDelete}>Delete</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FeedbackModal;


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FeedbackModal = ({ feedback, onClose, onDelete }) => {
  const userInfo = useSelector((state) => state.auth.user);
  const userId = userInfo._id;
  const staff = 'Staff';
  const [assignedTo, setSelectedStaff] = useState('');
  const [allStaffs, setAllStaffs] = useState([]);
  const modalRef = useRef();

  const staffs = allStaffs.filter((staff) => staff._id !== userId);

  useEffect(() => {
    const fetchIssuesData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/staffs/${staff}`);
        setAllStaffs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIssuesData();
  }, []);

  const handleAssignTo = async () => {
    try {
      if (feedback?.issueId && assignedTo) {
        const response = await axios.put(`http://localhost:8080/feedback/assign/${feedback.issueId}/${assignedTo}`);
        onDelete(feedback._id);
        window.location.href = 'http://localhost:3000/Home/staff-home';
      } else {
        console.log('Invalid feedback or assignedTo value', feedback);
      }
    } catch (error) {
      console.log('Error assigning to staff:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/feedback/${feedback._id}`);
      onDelete(feedback._id);
      alert('Deleted done');
    } catch (error) {
      console.log('Error deleting feedback:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div ref={modalRef} className="bg-white rounded-md shadow-lg" style={{ width: '50%', height: '50%' }}>
        <div className="p-8 h-full flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">{feedback?.issueTitle}</h2>
            <p className="text-gray-600 mb-4">{feedback?.feedbackText}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={`http://localhost:8080/${feedback.reporterImage}`}
                  alt="reporter_image"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-gray-700">{feedback?.reporterName}</span>
              </div>
              <span className="text-gray-500">Higher: {feedback?.wantToGoHigher ? 'Yes' : 'No'}</span>
            </div>
          </div>
          {feedback?.wantToGoHigher && (
            <select
              id="staffSelect"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={assignedTo}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              <option value="">Select staff</option>
              {staffs.map((s) => (
                <option key={s._id} value={s._id}>{s.position}</option>
              ))}
            </select>
          )}
          <div>
            <button className="mt-4 text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600" onClick={onClose}>
              Close
            </button>
            {feedback?.wantToGoHigher && (
              <button className="mt-4 text-white bg-blue-500 px-4 py-2 rounded hover:bg-black" onClick={handleAssignTo}>
                Assign To
              </button>
            )}
            <button className="mt-2 text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
