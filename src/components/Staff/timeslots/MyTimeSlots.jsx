import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { issueActions } from '../../../redux/issue/issueSlice';
import { BsSend } from 'react-icons/bs';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FormatDate from '../../helpers/FormatDate';
import { setDocuments } from '../../../redux/docs/docsSlice';

function MyTimeSlots() {
  const { issueId, reporterId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const issueDetails = useSelector((state) => state.issue.issues.filter(issue => issue._id === issueId));
  const StaffStudentComments = useSelector((state) => state.issue.StudentStaffComment);

  // State for the comment form
  const [reporter, setReporter] = useState([]);
  const [commentText, setComment] = useState('');
  const [authorId, setUserId] = useState('');
  const [closerInfo, setCloserInfo] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newStep, setNewStep] = useState('');
  const [steps, setSteps] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');

  const [feedback, setFeedback] = useState({
    text: feedbackText,
    author: authorId,
    steps: [], 
    attachment: null
  });

  useEffect(() => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      text: feedbackText,
      author: authorId,
      steps: steps,
    }));
  }, [feedbackText, authorId, steps]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch issue details
        const issueResponse = await axios.get(`http://localhost:8080/issue/view/${issueId}`);
        dispatch(issueActions.getIssueDetails(issueResponse.data));

        // Fetch reporter info
        const reporterResponse = await axios.get(`http://localhost:8080/auth/${issueResponse.data.issue.reporter}`);
        setReporter(reporterResponse.data);

        // Fetch comments
        const commentsResponse = await axios.get(`http://localhost:8080/issue/staff-student-chat/${issueId}/comments`);
        const commentData = commentsResponse.data;
        await axios.put(`http://localhost:8080/issue/mark-as-read/${issueId}`);

        // Fetch user information for each comment
        const commentsWithUserInfo = await Promise.all(
          commentData.map(async (comment) => {
            const userInfoResponse = await axios.get(`http://localhost:8080/auth/${comment.author}`);
            const userInfo = userInfoResponse.data;

            return {
              ...comment,
              userInfo,
            };
          })
        );

        dispatch(issueActions.setStaffStudentComment(commentsWithUserInfo));

        // Fetch documents
        const documentsResponse = await axios.get(`http://localhost:8080/docs/documents/${issueId}`);
        dispatch(setDocuments(documentsResponse.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up an interval to fetch data every second
    const interval = setInterval(fetchData, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch, issueId]);

  useEffect(() => {
    const storedUserInfo = JSON.parse(sessionStorage.getItem('authState'));
    if (storedUserInfo && storedUserInfo.user && storedUserInfo.user._id) {
      setUserId(storedUserInfo.user._id);
      setCloserInfo(storedUserInfo.user);
    } else {
      console.log('Failed to fetch userID');
    }
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      text: commentText,
      authorId: authorId,
    };

    try {
      if (commentText && authorId) {
        const response = await axios.post(`http://localhost:8080/issue/staff-student-chat/${issueId}/comments`, commentData);
        const newComment = response.data;
        dispatch(issueActions.addStaffStudentComment(newComment));
        setComment('');
      } else {
        console.log('commentText and userId are required to create a comment');
      }
    } catch (error) {
      console.log('Error submitting comment:', error);
    }
  };

    // token
    const token = sessionStorage.getItem('authToken');

    if (!token) {
      console.error('No token found');
      return;
    }

  const handleCloseIssue = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/issue/close/${issueId}/${reporterId}`, feedback, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(issueActions.setIssueToClose(response.data));
      navigate('/Home/staff-issue-page');
    } catch (error) {
      console.log('Error closing issue:', error);
    }
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleAddStep = () => {
    if (newStep.trim() !== '') {
      setSteps([...steps, newStep]);
      setNewStep('');
    }
  };

  return (
    <div className="">
        <div className="md:w-[100%] md:p-5">
          <p className="text-2xl pt-3 md:text-4xl font-bold md:pb-3">{issueDetails[0]?.category} issue</p>
          <div>
            <FormatDate createOn={issueDetails[0]?.createdAt} status={issueDetails[0]?.status}/>
          </div>
          <div className='w-full'>
            <p className='text-md pt-3 md:text-xl'>{issueDetails[0]?.description}</p>
            <div className='pt-5'>
              {issueDetails[0]?.attachments && issueDetails[0]?.attachments.length > 0 ? (
                <a href={`http://localhost:8080${issueDetails[0].attachments[0].url}`} target="_blank" rel="noopener noreferrer" className="block text-blue-500">
                  Attachment file
                </a>
              ) : (
                <p className='text-blue-500'>No attachment</p>
              )}
            </div>
          </div>

        </div>
        <div className="md:p-10 border">
          <p className='pb-5'>({StaffStudentComments.length})Comments</p>
          {Array.isArray(StaffStudentComments) && StaffStudentComments.map((comment) => (
            <div className="flex gap-2 md:p-2" key={comment._id}>
              <img
                className="w-8 h-8 rounded-full"
                src={`http://localhost:8080/${comment?.userInfo?.profile}`}
                alt="No_Pic"
              />
              <div>
                <p className="font-bold">
                  {comment?.userInfo?.fullName}
                  <span className="text-gray-300 text-xs pl-10">
                    
                    <FormatDate createOn={comment.createdAt}/>
                  </span>
                </p>
                <p className="text-md">{(comment.text).replace(/<[^>]*>/g, '')}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-2 p-2">
            <div className='mt-3'>
              <form onSubmit={handleCommentSubmit}>
                <div>
                  <CKEditor
                    editor={ClassicEditor}
                    data={commentText}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setComment(data);
                    }}
                    style={{ width: '100%', height: '400px' }}
                  />
                </div>

                <div>
                  <input type="text" value={authorId} hidden readOnly />
                </div>
                <div className="p-3 text-red-500 font-bold">
                   {issueDetails[0]?.status === 'closed' ? 'Closed' : ( 
                      <button
                        type="submit"
                        className="bg-[#1F3365] hover.bg-blue-700 text-white py-1 px-3 sm rounded-md focus-border-transparent focus-outline-none focus-shadow-outline-none"
                      >
                     <BsSend />
                    </button>
                 )} 
                </div>
              </form>
              {closerInfo?.role === 'Staff' && (
                <div className='flex gap-3 items-center'>
                   {issueDetails[0]?.status ==='progress' && (
                      <button className='bg-[#1F3365] text-white p-2 rounded-sm focus:border-none' onClick={openForm} >Close issue</button>
                   )}
                </div>
              )}
              {isFormOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white w-full p-8 rounded-md md:w-[45%]">
                    <label htmlFor="form">Close issue with feedback</label>
                    <form className="flex flex-col space-y-4">
                      <textarea
                        placeholder='Type feedback....'
                        onChange={(e) => setFeedbackText( e.target.value)}
                        value={feedbackText}
                        className="w-full p-2 border rounded-md"
                        rows={6}
                      />
                      <button
                        type="submit"
                        className="bg-[#1F3365] text-white p-2 rounded-md hover:bg-blue-700"
                        onClick={handleCloseIssue}
                      >
                        Submit
                      </button>
                    </form>
                    <button
                      onClick={closeForm}
                      className="mt-4 bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
                    >
                      Close Form
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}

export default MyTimeSlots;
