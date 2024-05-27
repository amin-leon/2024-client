import React, { useEffect, useState} from 'react'
import IssuePageMenuAllIssues from './IssuePage_menu_All_issues';
import NewIssueForm from './subComponents/NewIssueForm';
import RequestCode from './subComponents/RequestCode';
import Mycodes from './My-codes';


function IssuePage() {
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
          return <IssuePageMenuAllIssues />;
        case 'new-issue':
          return <NewIssueForm />;
        case 'requestCode':
          return <RequestCode />;
          case 'my-codes':
            return <Mycodes />;
        default:
          return null;
      }
    };

    
    return (
    <div className="md:px-8 md:py-5 md:w-full md:grid md:grid-cols-6">
    <div className="pt-10 flex flex-col p-6 gap-3 col-span-1 border bg-gray-50">
      <div
        className={`p-5 text-black cursor-pointer rounded-md flex justify-center items-center ${
          selectedSetting === 'new-issue' ? 'bg-[#1F3365] text-white' : ''
        }`}
        onClick={() => handleSettingClick('new-issue')}
      >
        Rise New
      </div>
      <div
        className={`p-5 text-black rounded-md cursor-pointer flex justify-center items-center ${
          selectedSetting === 'all-issues' ? 'bg-[#1F3365] text-white' : ''
        }`}
        onClick={() => handleSettingClick('all-issues')}
      >
       All Issues
      </div>
      <div
        className={`p-5 text-black cursor-pointer rounded-md flex justify-center items-center ${
          selectedSetting === 'requestCode' ? 'bg-[#1F3365] text-white' : ''
        }`}
        onClick={() => handleSettingClick('requestCode')}
      >
         Request Code
      </div>
      <div
        className={`p-5 text-black cursor-pointer rounded-md flex justify-center items-center ${
          selectedSetting === 'my-codes' ? 'bg-[#1F3365] text-white' : ''
        }`}
        onClick={() => handleSettingClick('my-codes')}
      >
         Ongoing codes
      </div>
    </div>
    <div className="col-span-5 border h-full md:px-2">
      <div className="pb-5">
      </div>
      {renderMenuSelection()}
    </div>
  </div>
  )
}
export default IssuePage