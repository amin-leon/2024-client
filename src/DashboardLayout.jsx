// DashboardLayout.js
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Dashboard/Sidebar';
import Topnav from './components/Dashboard/Topnav';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on screens smaller than md on initial load
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on initial load
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex overflow-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-col w-full">
        <Topnav toggleSidebar={toggleSidebar} />
        <div className="flex-grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
