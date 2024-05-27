// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Dashboard/Sidebar';
// import Topnav from '../components/Dashboard/Topnav';
// import MainContent from '../components/Dashboard/MainContent';

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Close sidebar on screens smaller than md on initial load
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div className="flex overflow">
//       <Sidebar isSidebarOpen={isSidebarOpen} />
//       <div className="flex flex-col w-full">
//         <Topnav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//         <MainContent />
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Topnav from '../components/Dashboard/Topnav';
import MainContent from '../components/Dashboard/MainContent';

const App = () => {
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
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex overflow">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className={`flex flex-col w-full ${isSidebarOpen ? 'hidden' : ''}`}>
        <Topnav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <MainContent />
      </div>
    </div>
  );
};

export default App;
