import React, { useEffect, useState } from 'react';
import { CiChat2 } from 'react-icons/ci';
import MyTimeSlots from './timeslots/MyTimeSlots';
import SingleFeedback from './timeslots/SingleFeedback';
import { VscFeedback } from "react-icons/vsc";
import { IoDocumentsOutline } from "react-icons/io5";
import SharedDocs from './timeslots/SharedDocs';


function TimeSlots() {
  const [selectedSetting, setSelectedSetting] = useState('my-slots');
  const [userInfo, setUserInfo] = useState('');

  const handleSettingClick = (setting) => {
    setSelectedSetting(setting);
  };
  const renderSettingContent = () => {
    switch (selectedSetting) {
      case 'my-slots':
        return <MyTimeSlots />
      case 'feedback':
          return <SingleFeedback />;
      case 'sharedDocs':
          return <SharedDocs />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const storedUserInfo = JSON.parse(sessionStorage.getItem('authState'));
    if (storedUserInfo && storedUserInfo.user && storedUserInfo.user._id) {
      setUserInfo(storedUserInfo.user);
    } else {
      console.log('Failed to fetch userID');
    }
  }, []);


  return (
    <div className="md:p-5">
      {/* flex pt-3 */}
      <div className="md:flex md:pt-3 ">
        {/* w-[10%] flex flex-col items-center gap-2 pt-5 */}
        <div className="md:w-[10%] md:flex md:flex-col md:items-center md:gap-2 md:pt-5">
          <p className="text-2xl cursor-pointer md:p-2 hover:bg-[#1F3365] text-white bg-[#1F3365] hover:text-white" onClick={() => handleSettingClick('my-slots')}>
            <CiChat2 />
          </p>
          {userInfo?.role ==="Student" && (
              <p className="text-2xl cursor-pointer p-2 hover:bg-[#1F3365] text-white bg-[#1F3365] hover:text-white" onClick={() => handleSettingClick('feedback')}>
                <VscFeedback />
              </p>
          )}
          <p className="text-2xl cursor-pointer p-2 hover:bg-[#1F3365] text-white bg-[#1F3365] hover:text-white" onClick={() => handleSettingClick('sharedDocs')}>
            <IoDocumentsOutline />
          </p>
        </div>
        <div className="md:w-[90%] md:ml-4">
          <div className="">
            <div className="md:p-5 md:relative">
              {renderSettingContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeSlots;
