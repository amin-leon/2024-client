// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, Navigate } from 'react-router-dom';
// import { GrUserSettings } from "react-icons/gr";
// import { BsInfoCircle } from "react-icons/bs";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { GiConvergenceTarget } from "react-icons/gi";
// import { MdDashboard } from "react-icons/md";
// import { FaBars, FaPersonMilitaryToPerson } from "react-icons/fa6";

// const HamburgerMenu = () => (
//   <div className="md:hidden">
//     <div>
//       <button className="text-gray-700 focus:outline-none mr-3 md:hidden">
//           <FaBars />
//       </button>
//     </div>
//   </div>
// );

// const Sidebar = ({ isSidebarOpen }) => {
//   const userInfo = useSelector((state)=> state.auth.user);
//   const [link, setLink] = useState(null);

  // useEffect(() => {
  //   if (userInfo && userInfo.role) {
  //     if (userInfo.role === 'Student') {
  //       setLink('/Home/issue-page');
  //     } else if (userInfo.role === 'Admin') {
  //       setLink('/Home/admin/manage');
  //     } else {
  //       setLink('/Home/staff-home');
  //     }
  //   }
  // }, [userInfo]);

  // if (!userInfo) {
  //   return <Navigate to="/" />;
  // }

//   return (
//     <>
//     <HamburgerMenu />
//     <div
//       className={`bg-white sm:text-black sm:h-screen sm:w-64 sm:hidden sm:border border-r-1 md:block ${
//         isSidebarOpen ? 'block' : 'hidden md:block'
//       }`}
//     >
//       <div className="sm:flex flex flex-col items-center p-4 ">
//         <Link to="#">
//         <div className="p-3 border-b border-1">
//           <div className='text-black text-4xl font-bold'>NPC</div>
//         </div>
//         </Link>
//       </div>
//       <div className="mt-6 flex flex-col gap-2 justify-center">
//         <Link
//           to={link}
//           className="text-gray-500"
//         >
//           <div className='p-3 text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
//             <MdDashboard  className="text-xl" />Dashboard
//           </div>
//         </Link>

//         {userInfo.role === 'Staff' && (
//             <Link to="/Home/board-issues" className="text-gray-500">
//                     <div className='p-3 text-black  rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
//                       <GiConvergenceTarget className="text-xl" />Chat Room
//                     </div>
//             </Link>
//         )}

//         <Link to="/Home/settings" className="text-gray-500">
//           <div className='p-3 text-black  rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
//             <BsInfoCircle className="text-xl" /> Info
//           </div>
        
          
//           {userInfo.role === 'Admin' && (
//           <Link to="/Home/school" className="text-gray-500">
//             <div className='p-3 text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
//               <FaPersonMilitaryToPerson  className="text-xl" /> Positions
//             </div>
//           </Link>
//           )}

//         </Link>
//         <Link to="/Home/admin/setting" className="text-gray-500">
//               <div className='p-3  text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
//                   <GrUserSettings className="text-xl text-black" />Settings
//               </div>
//         </Link>

//         <Link to="/Home/my/notifications" className="text-gray-500">
//               <div className='p-3  text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
//                   <IoIosNotificationsOutline  className="text-xl text-black" />Notifications
//               </div>
//         </Link>

//       </div>
//     </div>
//     </>
//   );
// };
// export default Sidebar;

import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import { GrUserSettings } from "react-icons/gr";
import { BsInfoCircle } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GiConvergenceTarget } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { FaBars, FaPersonMilitaryToPerson } from "react-icons/fa6";

const Sidebar = ({ isSidebarOpen }) => {
  const userInfo = useSelector((state) => state.auth.user);
  const [link, setLink] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.role) {
      if (userInfo.role === 'Student') {
        setLink('/Home/issue-page');
      } else if (userInfo.role === 'Admin') {
        setLink('/Home/admin/manage');
      } else {
        setLink('/Home/staff-home');
      }
    }
  }, [userInfo]);

  if (!userInfo) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`bg-white sm:text-black sm:h-screen sm:w-64 sm:border border-r-1 md:block transition-width duration-500 ${isSidebarOpen ? 'w-full' : 'hidden md:block'}`}>
      {/* Your Sidebar content here */}
      <div className="sm:flex flex flex-col items-center p-4">
        <Link to="#">
          <div className="p-3 border-b border-1">
            <div className="text-black text-4xl font-bold">
              <img src="https://www.npc.ac.rw/fileadmin/templates/assets/images/NPC_LOGO.png" alt="" className="w-24 h-24" />
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-2 justify-center">
        <Link to={link} className="text-gray-500">
          <div className="p-3 text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center">
            <MdDashboard className="text-xl" />
            Dashboard
          </div>
        </Link>
        {userInfo.role === "Staff" && (
          <Link to="/Home/board-issues" className="text-gray-500">
            <div className="p-3 text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center">
              <GiConvergenceTarget className="text-xl" /> Chat Room
            </div>
          </Link>
        )}
        <Link to="/Home/settings" className="text-gray-500">
          <div className="p-3 text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center">
            <BsInfoCircle className="text-xl" /> Info
          </div>
          {userInfo.role === "Admin" && (
            <Link to="/Home/school" className="text-gray-500">
              <div className="p-3 text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center">
                <FaPersonMilitaryToPerson className="text-xl" /> Positions
              </div>
            </Link>
          )}
        </Link>
        <Link to="/Home/admin/setting" className="text-gray-500">
          <div className="p-3 text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center">
            <GrUserSettings className="text-xl text-black" />
            Settings
          </div>
        </Link>
        <Link to="/Home/my/notifications" className="text-gray-500">
          <div className="p-3 text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center">
            <IoIosNotificationsOutline className="text-xl text-black" />
            Notifications
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
