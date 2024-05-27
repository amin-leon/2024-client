// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';




// function MeetingAndEscalate({ onClose, issueId }) {

//   // logged in user
//   const userInfo = useSelector((state) => state.auth.user);
//   const userId = userInfo._id;

//   const [issue, setIssue] = useState(issueId);
//   const [allStaffs, setAllStaffs] = useState([]);
//   const [assignedTo, setSelectedStaff] = useState('');

//   // filter my id
//   const staffs = allStaffs.filter((staff) => staff._id !==userId)

//   // Use useEffect to update the issue state when issueId changes
//   useEffect(() => {
//     setIssue(issueId);
//   }, [issueId]);

//   // Fetch all staff
//   useEffect(() => {
//     const fetchStaffData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/auth/staffs/Staff');
//         setAllStaffs(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     fetchStaffData();
//   }, []);

//   // Escalate Issue to top level
//   const escalateIssue = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:8080/issue/escalate/${issueId}`, { assignedTo });
//       onClose()
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Share issue to group chat
//   const handleShare = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:8080/issue/share/${issue}`);
//       onClose()
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
//       <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
//       <div className="bg-white w-[500px] h-[400px] p-4 rounded-lg shadow-md z-10 flex flex-col justify-between">
//         <div>
//           <p className="text-lg font-bold mb-4">Escalate Issue</p>
//           <form>
//             <div className="mb-4">
//               <label htmlFor="selectOption" className="block mb-1">Select Staff</label>
//               <select
//                 id="selectOption"
//                 name="selectOption"
//                 className="w-full p-2 rounded-md"
//                 value={assignedTo}
//                 onChange={(e) => setSelectedStaff(e.target.value)}
//               >
//                 {staffs.map((staff) => (
//                   <option key={staff._id} value={staff._id}>{staff.position}</option>
//                 ))}
//               </select>
//             </div>
//             <button
//               className="bg-[#1F3365] text-white p-2 rounded-md w-full"
//               onClick={escalateIssue}
//             >
//               Escalate
//             </button>
//           </form>
//         </div>
//         <div>
//           <p className="text-lg font-bold mb-4">Post in Chat Room</p>
//           <form>
//             <div className="mb-4">
//               <label htmlFor="issueInput" className="block mb-1">Issue</label>
//               <input
//                 type="text"
//                 id="issueInput"
//                 name="issue"
//                 className="w-full p-2 rounded-md border border-gray-300"
//                 value={issue}
//                 onChange={(e) => setIssue(e.target.value)}
//               />
//             </div>
//             <button
//               className="bg-[#1F3365] text-white p-2 rounded-md w-full"
//               onClick={handleShare}
//             >
//               Share
//             </button>
//           </form>
//         </div>
//         <button
//           className="bg-[#1F3365] text-white p-2 rounded-md mt-4"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// export default MeetingAndEscalate;


import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function MeetingAndEscalate({ onClose, issueId }) {
  const userInfo = useSelector((state) => state.auth.user);
  const userId = userInfo._id;

  const [issue, setIssue] = useState(issueId);
  const [allStaffs, setAllStaffs] = useState([]);
  const [assignedTo, setSelectedStaff] = useState('');

  const modalRef = useRef();

  const staffs = allStaffs.filter((staff) => staff._id !== userId);

  useEffect(() => {
    setIssue(issueId);
  }, [issueId]);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/staffs/Staff');
        setAllStaffs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStaffData();
  }, []);

  const escalateIssue = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/issue/escalate/${issueId}`, { assignedTo });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/issue/share/${issue}`);
      onClose();
    } catch (error) {
      console.log(error);
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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div ref={modalRef} className="bg-white w-[500px] h-[400px] p-4 rounded-lg shadow-md z-10 flex flex-col justify-between">
        <div>
          <p className="text-lg font-bold mb-4">Escalate Issue</p>
          <form>
            <div className="mb-4">
              <label htmlFor="selectOption" className="block mb-1">Select Staff</label>
              <select
                id="selectOption"
                name="selectOption"
                className="w-full p-2 rounded-md"
                value={assignedTo}
                onChange={(e) => setSelectedStaff(e.target.value)}
              >
                {staffs.map((staff) => (
                  <option key={staff._id} value={staff._id}>{staff.position}</option>
                ))}
              </select>
            </div>
            <button
              className="bg-[#1F3365] text-white p-2 rounded-md w-full"
              onClick={escalateIssue}
            >
              Escalate
            </button>
          </form>
        </div>
        <div>
          <p className="text-lg font-bold mb-4">Post in Chat Room</p>
          <form>
            <div className="mb-4">
              <label htmlFor="issueInput" className="block mb-1">Issue</label>
              <input
                type="text"
                id="issueInput"
                name="issue"
                className="w-full p-2 rounded-md border border-gray-300"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              />
            </div>
            <button
              className="bg-[#1F3365] text-white p-2 rounded-md w-full"
              onClick={handleShare}
            >
              Share
            </button>
          </form>
        </div>
        <button
          className="bg-[#1F3365] text-white p-2 rounded-md mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default MeetingAndEscalate;
