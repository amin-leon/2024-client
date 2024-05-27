import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ClaimFormModal = ({ onClose }) => {
  const issueDetails = useSelector((state) => state.issue.studentIssues);
  const [formData, setFormData] = useState({
    issueId: issueDetails?.issue._id,
    reporter:issueDetails?.issue.reporter,
    assignedStaff:issueDetails?.issue.assignedTo,
    reason: '',
    feedbackMessage: '',
    wantToGoHigher: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/feedback/new', formData);
      console.log('Feedback submitted:', response.data);

      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full md:w-[50%]">
        <h2 className="text-lg font-bold mb-4">Student's Feedback Form </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Reason for feedback</label>
            <textarea
              name="reason"
              rows={4}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter reason for feedback"
              value={formData.reason}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">What can we do improve resolution of issue?</label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="whatToImprove"
                  value={formData.whatToImprove}
                  className="mr-2"
                  onChange={handleChange}
                />
                Happy?
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Add Feedback </label>
            <textarea
              name="feedbackMessage"
              rows={4}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter feedback"
              value={formData.feedbackMessage}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="wantToGoHigher"
                className="mr-2"
                checked={formData.wantToGoHigher}
                onChange={handleChange}
              />
              Do you want to meet Higher level Staff?
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="Send feedback"
              className={`bg-[#1F3365] hover:bg-black text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              Send feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const SingleFeedback = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const issueDetails = useSelector((state) => state.issue.studentIssues);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[100%] bg-white shadow-md rounded-md overflow-hidden my-4">
      {issueDetails?.issue.status === 'closed' ? (
        <div>
          <div className="md:px-6 md:py-4">
            <div className="font-bold text-lg mb-2">Feedback Details</div>
            <p className="text-sm mb-2"><strong>Issue title:</strong> {issueDetails?.issue.title}</p>
            <p className="text-sm mb-2"><strong>Submitted Date:</strong> {new Date(issueDetails?.issue.updatedAt).toLocaleDateString()}</p>
            <p className="text-sm mb-2"><strong>Status:</strong> {issueDetails?.issue.status}</p>
          </div>
          <div className="md:px-6 md:py-4">
            <div className="font-bold text-lg mt-4 mb-2">Feedback</div>
            {issueDetails?.issue.feedback.map((feedbackItem, index) => (
              <div key={index} className="bg-gray-100 rounded-md md:p-4 mb-4">
                <p>{feedbackItem.text}</p>
              </div>
            ))}
          </div>
          <div className='flex justify-end px-6 py-4'>
            <button
              onClick={openModal}
              className='bg-[#1F3365] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-blue-600'
            >
              Want to Claim?
            </button>
          </div>
          {isModalOpen && <ClaimFormModal onClose={closeModal} />}
        </div>
      ) : (
        <div className="px-6 py-4">
          <p className="text-sm">No Feedback yet</p>
        </div>
      )}
    </div>
  );
};

export default SingleFeedback;


