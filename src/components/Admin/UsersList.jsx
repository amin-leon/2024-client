import React, { useState } from 'react'
import PendingUsers from './users/PendingUsers';
import RecentAproved from './users/RecentAproved';
import AllUsers from './users/AllUsers';
import { MdOutlineAirplanemodeActive, MdOutlineAirplanemodeInactive } from 'react-icons/md';


function Users() {
    const [selectedSetting, setSelectedSetting] = useState('pending-users');

    const handleSettingClick = (setting) => {
      setSelectedSetting(setting);
    };
    const renderSettingContent = () => {
      switch (selectedSetting) {
        case 'pending-users':
          return <PendingUsers />;
        case 'recent-aproved-users':
          return <RecentAproved />;
        case 'manage-users':
          return <AllUsers />;
        default:
          return null;
      }
    };
  return (
  <div className="md:px-32 md:pt-8 bg-white overflow-x-auto">
    <PendingUsers />
  </div>

  )
}

export default Users