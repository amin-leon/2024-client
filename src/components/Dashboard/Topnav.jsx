import React, { useEffect } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdPowerSettingsNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { notificationActions } from '../../redux/notifications/notificationSlice';
import { CiCircleAlert } from 'react-icons/ci';
import { alertsActions } from '../../redux/alerts/alertsSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authActions } from '../../redux/auth/authSlice';
import { FaBars } from 'react-icons/fa';

const Topnav = ({ toggleSidebar, isSidebarOpen }) => {
  const user = useSelector((state) => state.auth.user);
  const notifications = useSelector((state) => state.notifications.notifications.filter(notification => !notification.isRead));
  const alerts = useSelector((state) => state.alerts.alerts.filter(alert => !alert.isRead));

  const dispatch = useDispatch();

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/notifications/${user._id}`);
      dispatch(notificationActions.setNots(response.data));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/alerts/${user._id}`);
      const alerts = response.data;

      dispatch(alertsActions.setAlerts(alerts));
      if (alerts[0]?.count > 0) {
        toast.error('Hey! You got new issues');
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
      fetchAlerts();
      
      const notificationsInterval = setInterval(fetchNotifications, 20000);
      const alertsInterval = setInterval(fetchAlerts, 20000);
      
      return () => {
        clearInterval(notificationsInterval);
        clearInterval(alertsInterval);
      };
    }
  }, [user, dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(authActions.logoutUser());
  };

  return (
    <div className={`bg-white text-gray-700 h-24 flex justify-between items-center px-6 shadow-md ${isSidebarOpen ? 'ml-64' : ''}`}>
       <div className="flex items-center">
        <div className="flex items-center text-black flex-grow justify-center gap-2">
          <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none mr-3 md:hidden">
            <FaBars className='text-3xl'/>
          </button>
        </div>
      </div>
      <div className="flex items-center relative">
        <ToastContainer
          className='absolute bottom-0 right-0'
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="relative group">
          <div className="mr-3 flex items-center gap-3">
            <Link to='http://localhost:3000/Home/my/notifications'>
              <IoMdNotificationsOutline className="text-3xl relative text-black" />
            </Link>
            {notifications.length > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 ml-3 absolute top-[-6px] left-0">
                {notifications.length}
              </span>
            )}
            <Link to='#'>
              <CiCircleAlert className="text-3xl relative text-black" />
            </Link>
            {alerts.length > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 ml-6 absolute top-[-6px] left-8">
                { alerts[0]?.count }
              </span>
            )}
            <button className="focus:outline-none" onClick={handleLogout}>
              <MdPowerSettingsNew className="text-2xl text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnav;

