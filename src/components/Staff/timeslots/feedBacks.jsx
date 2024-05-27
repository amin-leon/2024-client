import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackModal from './FeedbackModal';
import { useDispatch,useSelector } from 'react-redux';
import { feedbackActions } from '../../../redux/feedbacks/feeddbackSlice';

const FeedbackComponent = () => {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const feedbackData = useSelector((state) => state.feedbacks.feedbacks);


  useEffect(() => {
    const storedUserInfo = JSON.parse(sessionStorage.getItem('authState'));
    if (storedUserInfo && storedUserInfo.user && storedUserInfo.user._id) {
      setUserId(storedUserInfo.user._id);
    } else {
      console.log('Failed to fetch userID');
    }
  }, []);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        if (!userId) return;
        const response = await axios.get(`http://localhost:8080/feedback/${userId}`);
        dispatch(feedbackActions.setFeedbacks(response.data))
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchFeedbackData();
  }, [userId]);

  const openModal = async (feedback) => {
    setSelectedFeedback(feedback);
    await updateIsRead(feedback);
  };

  const closeModal = () => {
    setSelectedFeedback(null);
  };

  const updateIsRead = async (feedback) => {
    try {
      await axios.put(`http://localhost:8080/feedback/read/${feedback._id}`);
    } catch (error) {
      console.error('Error updating isRead:', error);
    }
  };

  const groupFeedbackByDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const previousDay = new Date(today);
    previousDay.setDate(today.getDate() - 2);

    const todayFeedback = [];
    const yesterdayFeedback = [];
    const previousDayFeedback = [];
    const otherFeedback = [];

    feedbackData?.forEach((feedback) => {
      const feedbackDate = new Date(feedback.createdAt);
      if (feedbackDate.toDateString() === today.toDateString()) {
        todayFeedback.push(feedback);
      } else if (feedbackDate.toDateString() === yesterday.toDateString()) {
        yesterdayFeedback.push(feedback);
      } else if (feedbackDate.toDateString() === previousDay.toDateString()) {
        previousDayFeedback.push(feedback);
      } else {
        otherFeedback.push(feedback);
      }
    });

    return [
      { title: 'Today', data: todayFeedback },
      { title: 'Yesterday', data: yesterdayFeedback },
      { title: 'Previous Day', data: previousDayFeedback },
      { title: 'Other', data: otherFeedback },
    ];
  };

  const groupedFeedbackData = groupFeedbackByDate();


  return (
    <div className="container mx-auto py-8">
      {groupedFeedbackData?.map((group) => (
        <div key={group.title}>
          <h2 className="text-2xl font-bold mb-4">{group.title}</h2>
          {group.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.data.map((feedback) => (
                <div
                  key={feedback._id}
                  className={`bg-white rounded-md shadow-md p-6 cursor-pointer ${
                    !feedback.isRead ? 'border border-red-500' : ''
                  }`}
                  
                  onClick={() => openModal(feedback)}
                >
                  <h2 className="text-lg font-semibold mb-2">{feedback.issueTitle}</h2>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={'http://localhost:8080/'+feedback.reporterImage}
                        alt="reporter_image"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-gray-700">{feedback.reporterName}</span>
                    </div>
                    <span className="text-gray-500">{new Date(feedback.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No feedback found</div>
          )}
        </div>
      ))}
      {selectedFeedback && <FeedbackModal feedback={selectedFeedback} onClose={closeModal} />}
    </div>
  );
};

export default FeedbackComponent;
