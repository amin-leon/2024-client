import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { codesActions } from '../../../redux/request_codes/codesSlice';
import { useNavigate } from 'react-router-dom';




function RequestedCodes() {
  const dispatch = useDispatch(); // Initialize useDispatch
  const navigate = useNavigate();


  const dummyCodeRequests = useSelector(state => state.codes.codeRequests.filter(request => request.status === 'Pending'));
  const [codeRequests, setCodeRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // request codes data
  const [selectedCode, setSelectedCode] = useState(null);
  const [reasonforrrequest, setreasonforRequest] = useState(null);
  const [why, setWhy] = useState(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const codesPerPage = 7;

  useEffect(() => {
    // Use dummy data for code requests
    setCodeRequests(dummyCodeRequests);
  }, []);

  const handleConfirm = (code, reason, why) => {
    setSelectedCode(code);
    setreasonforRequest(reason)
    setWhy(why)


    setIsConfirmModalOpen(true);
  };

 // Function to handle rejecting a code request
 const handleReject = async (code) => {
  try {
    // Remove the code request from the state
    const updatedCodeRequests = dummyCodeRequests?.filter(request => request._id !== code);
      
    // Update the state with the filtered array
    setCodeRequests(updatedCodeRequests);
    
    // Send a DELETE request to your server endpoint to delete the code request from the database
    const response = await fetch(`http://localhost:8080/api/code/delete-code-request/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to reject code request');
    }

    console.log(`Code request with code ${code} rejected successfully`);
  } catch (error) {
    console.error('Error rejecting code request:', error.message);
  }
};

  const ComfirmRequestCode = async() => {

    setIsConfirmModalOpen(false);
    setSelectedCode(null);

    try {
      // Make API call to update status to "Approved"
      const response = await axios.put(
        `http://localhost:8080/api/code/confirm-code-request/${selectedCode}`,
        { status: 'Approved' }
      );
      dispatch(codesActions.updateCodeRequest(selectedCode))
      navigate('/Home/admin/manage');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Pagination
  const indexOfLastCode = currentPage * codesPerPage;
  const indexOfFirstCode = indexOfLastCode - codesPerPage;
  const currentCodes = codeRequests.slice(indexOfFirstCode, indexOfLastCode);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(codeRequests.length / codesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div>
      <div className="bg-no-repeat bg-cover bg-center relative pt-10">
        <div className="flex z-10">
          {/* p-12 bg-white mx-auto rounded-2xl w-[90%] h-screen border */}
          <div className="w-full md:p-12  md:mx-auto rounded-2xl md:w-[90%] bg-white border overflow-x-scroll">
            <div>
              <p className="text-2xl pt-5">Private channels requests</p>
            </div>
            {currentCodes.length > 0 ? (
              <table className="min-w-full table-auto overflow-x-scroll">
                <thead>
                  <tr className="bg-gray-300 text-gray-700 text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Full Name</th>
                    <th className="py-3 px-6 text-left">Staff Assigned</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {currentCodes.map((request, index) => (
                    <tr
                      key={request.requester}
                      className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">{request?.requesterInfo.email}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{request.requesterInfo.name}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{request?.staffInfo.name}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <button
                          onClick={() => handleConfirm(request._id, request.why, request.reason )}
                          className="bg-[#1F3365] text-white px-4 py-2 mr-2 rounded-md"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No code requests found.</p>
            )}
            {/* Pagination */}
            <div className="mt-4 flex justify-end">
              <nav>
                <ul className="pagination flex space-x-2">
                  {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                      <button
                        onClick={() => handlePageClick(number)}
                        className={`${
                          currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-blue-300'
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
        </div>
      </div>
      {/* Confirm Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50">
          <div className="relative w-[700px] bg-white rounded-lg shadow-lg">
            <div className="flex flex-col p-6 space-y-4">
              <p className="text-lg font-bold">Confirm Code</p>
              <p>Reason for requesting private code:</p>
              <p>{why}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={ComfirmRequestCode}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestedCodes
