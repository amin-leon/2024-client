import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { issueActions } from '../../redux/issue/issueSlice';
import AssignIssuePopup from './AssignIssuePopup';
import FormatDate from '../helpers/FormatDate';

function IssueDetailsPage() {
  const { issueId } = useParams();
  const dispatch = useDispatch();
  const issueDetails = useSelector((state) => state.issue.studentIssues);


  const [reporter, setReporter] = useState([]);

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/issue/view/${issueId}`);
        const issueData = response.data;
        dispatch(issueActions.getIssueDetails(issueData));
        // reporter name
        const reporterInfo = await axios.get(`http://localhost:8080/auth/${issueData.issue.reporter}`);
        setReporter(reporterInfo.data);
      } catch (error) {
        console.error('Error fetching issue details:', error);
      }
    };

    fetchIssueDetails();
  }, [dispatch, issueId]);
  


  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [selectedReporter, setSelectedselected] = useState(null);

  const assignIssueToStaff = (issueId, senderId) => {
    setPopupOpen(true);
    setSelectedIssueId(issueId);
    setSelectedselected(senderId);
  };


  return (
    <div className="md:grid md:grid-cols-3 gap-4 md:pl-32 md:pr-32 pt-4 md:pt-20">
      <div className="col-span-2">
        <div className="border p-5">
          <p className="text-4xl font-bold pb-3">{issueDetails?.issue?.category} issue</p>
          <p><FormatDate createOn={issueDetails?.issue?.dateReported}/></p>
        </div>
        <div className="p-4 border">
              <div className=''>
                 <p className='text-xl'>{issueDetails?.issue?.description}</p>
                 <button
                  onClick={() => assignIssueToStaff(issueDetails?.issue?._id, issueDetails?.issue?.reporter)}
                  className="bg-[#1F3365] text-white p-2 rounded hover:bg-blue-700 mt-5"
                >
                   Assign To
                </button>
              </div>
        </div>
      </div>

      <div className="md:col-span-1">
        <div className="p-4 border flex gap-3 mb-5">
          <img className='w-20 h-20 rounded-md' src={`http://localhost:8080/${reporter?.profile}`} alt="" />
          <div>
            <p className='text-xl font-bold'>{reporter.fullName}</p>
            <p className='text-xs text-gray-500'>{reporter.role}</p>
            <button className='text-white text-xs bg-[#1f3365b6] rounded-md p-1 pl-2 pr-2 mt-5 hover-bg-black'>More info ...</button>
          </div>
        </div>
        <div className="p-4 border">
          <p className='pb-3'>Attachments or files</p>
          <div className=''>
          {issueDetails?.issue?.attachments.map((doc)=> (
            <a key={Date.now() + doc._id}
               href={`http://localhost:8080${doc.url}`}
               download={doc.filename} 
               className='text-blue-400 underline cursor-pointer'>{doc.filename}
            </a>
          ))}

          </div>
        </div>
      </div>
      <AssignIssuePopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        issueId={selectedIssueId}
        senderId= {selectedReporter}
      />
    </div>
  );
}

export default IssueDetailsPage;
