import React, { useState } from 'react';
import { GoImage } from 'react-icons/go';
import { PiPasswordLight } from 'react-icons/pi';
import { BiSolidUserDetail } from 'react-icons/bi';
import UserDetailComponent from './UserDetailComponent'
import PasswordComponent from './PasswordComponent'
import ImageComponent from './ImageComponent'

// Separate components for each setting

function AccountSettingsAdmin() {
  const [selectedSetting, setSelectedSetting] = useState('user-detail');

  const handleSettingClick = (setting) => {
    setSelectedSetting(setting);
  };

  const renderSettingContent = () => {
    switch (selectedSetting) {
      case 'user-detail':
        return <UserDetailComponent />;
      case 'image':
        return <ImageComponent />;
      case 'password':
        return <PasswordComponent />;
      default:
        return null;
    }
  };

  return (
    <div className=''>
  
      <div className='w-full md:flex h-[8%] md:px-4 md:flex-col md:items-center'>
        <div className='flex md:w-[90%] justify-between bg-slate-200 p-5'>
            <div className=''>
              <p>Account Settings</p>
            </div>
            <div className=' flex flex-row items-center gap-2'>
              <p
                className='text-3xl cursor-pointer bg-blue-500 text-white p-2 hover:bg-blue-500 hover:text-white'
                onClick={() => handleSettingClick('user-detail')}
              >
                <BiSolidUserDetail />
              </p>
              <p
                className='text-3xl cursor-pointer p-2 hover:bg-blue-500 hover:text-white'
                onClick={() => handleSettingClick('image')}
              >
                <GoImage />
              </p>
              <p
                className='text-3xl cursor-pointer p-2 hover:bg-blue-500 hover:text-white'
                onClick={() => handleSettingClick('password')}
              >
                <PiPasswordLight />
              </p>
            </div>
        </div>
        {/* w-[90%] flex justify-center bg-white border p-24 */}
        <div className=' md:w-[90%] md:flex md:justify-center md:bg-white border md:p-24'>
          {renderSettingContent()}
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsAdmin;
