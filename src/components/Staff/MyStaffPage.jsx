import React, { useEffect, useState } from 'react';
import AllIssues from './AllIssues';
import IssuesInProgress from './Progress';
import Report from './Report';
import FeedbackComponent from './timeslots/feedBacks';

function MyStaffPage() {
  const [userInfo, setUserState] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('authState'));
    if (userInfo && userInfo.isLoggedIn) {
      setUserState(userInfo);
    }
  }, []);

  const [selectedSetting, setSelectedSetting] = useState('all-issues');
  const handleSettingClick = (setting) => {
    setSelectedSetting(setting);
  };

  const renderMenuSelection = () => {
    switch (selectedSetting) {
      case 'all-issues':
        return <AllIssues />;
      case 'busting-issue':
        return <IssuesInProgress />;
      case 'feedback':
        return <FeedbackComponent />;
      default:
        return null;
    }
  };

  return (
    // 
    <div className="md:px-8 md:py-2 md:w-full md:grid md:grid-cols-6">
      <div className="pt-10 flex flex-col p-6 gap-3 col-span-1 border bg-gray-50">
        <div
          className={`p-5 text-black cursor-pointer rounded-md flex justify-center items-center ${
            selectedSetting === 'all-issues' ? 'bg-[#1F3365] text-white' : ''
          }`}
          onClick={() => handleSettingClick('all-issues')}
        >
          Issues
        </div>
        <div
          className={`p-5 text-black rounded-md cursor-pointer flex justify-center items-center ${
            selectedSetting === 'feedback' ? 'bg-[#1F3365] text-white' : ''
          }`}
          onClick={() => handleSettingClick('feedback')}
        >
          Feedbacks
        </div>
        <div
          className={`p-5 text-black rounded-md cursor-pointer flex justify-center items-center ${
            selectedSetting === 'new-issue' ? 'bg-[#1F3365] text-white' : ''
          }`}
          onClick={() => handleSettingClick('busting-issue')}
        >
          Most rised
        </div>
      </div>
      <div className="col-span-5 border px-8">
        <div className="">
          {renderMenuSelection()}
        </div>
      </div>
    </div>
  );
}

export default MyStaffPage;
