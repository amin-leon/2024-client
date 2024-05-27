import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import Home from './pages/Home';
import ManageSystem from './components/Admin/ManageSystem';
import StaffHomePage from './components/Staff/StaffHomePage';
import UpdateIssue from './components/Student/updateIssue';
import AccountSettings from './components/Student/AccountSettings';
import BoardChat from './components/General/BoardChat';
import BoardIssuesTOChatOn from './components/General/BoardIssuesTOChatOn';
import HeroSectionStudent from './components/Student/HeroSectionStudent';
import IssuesList from './components/Student/IssuesList';
import IssuePage from './components/Student/IssuePage';
import TimeSlots from './components/Staff/IssueDiscusion';
import MyStaffPage from './components/Staff/MyStaffPage';
import AccountSettingsAdmin from './components/Admin/Settings';
import UserListDetails from './components/Admin/users/UserListDetails';
import IssueDetailsPage from './components/Staff/IssueDetailsPage';
import School_Students from './components/Student/school/School_Students';
import School_Staffs from './components/Staff/school/School_staffs';
import NewStudentForm from './components/Student/school/NewStudent';
import NewStaffForm from './components/Staff/school/NewStaffForm';
import EditStudentInfo from './components/Student/school/EditStudent';
import EditStaffInfo from './components/Staff/school/EditStaffInfo';
import Users from './components/Admin/UsersList';
import StaffPage from './components/Staff/staffPage';
import RequestedCodes from './components/Admin/RequestCodes/RequestedCodes';
import Notifications from './components/General/Notifications';
import { useEffect, useState } from 'react';

const App = () => {
  const [isLoggedIn, setUserState] = useState(false); // Default to false

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('authState'));
    if (userInfo && userInfo.isLoggedIn) {
      setUserState(true);
    }
  }, []); // Runs only once when component mounts

  // Fetch isLoggedIn state from sessionStorage periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const userInfo = JSON.parse(sessionStorage.getItem('authState'));
      if (userInfo && userInfo.isLoggedIn !== isLoggedIn) {
        setUserState(userInfo.isLoggedIn);
      }
    }, 100); // Adjust interval as needed
    return () => clearInterval(interval); // Cleanup function
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <LoginForm /> : <Navigate to="/Home" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/Home/*"
          element={
            isLoggedIn ? (
              <DashboardLayout>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="update-issue/:id" element={<UpdateIssue />} />
                  <Route path="settings" element={<AccountSettings />} />
                  <Route path="my/notifications" element={<Notifications />} />
                  <Route path="staff-chatboard/:issueId" element={<BoardChat />} />
                  <Route path="board-issues" element={<BoardIssuesTOChatOn />} />
                  <Route path="hero" element={<HeroSectionStudent />} />
                  <Route path="issue-list" element={<IssuesList />} />
                  <Route path="issue-page" element={<IssuePage />} />
                  <Route path="manage-issue/:issueId/:reporterId?" element={<TimeSlots />} />
                  <Route path="staff-home" element={<StaffHomePage />} />
                  <Route path="timeslots/:issueId" element={<TimeSlots />} />
                  <Route path="staff-issue-page" element={<MyStaffPage />} />
                  <Route path="admin/manage" element={<ManageSystem />} />
                  <Route path="admin/manage/requests" element={<RequestedCodes />} />
                  <Route path="admin/users" element={<Users />} />
                  <Route path="admin/manage-users/:userId" element={<UserListDetails />} />
                  <Route path="school" element={<School_Students />} />
                  <Route  path="school/new" element={<NewStudentForm />} />
                  <Route  path="school/edit/:id" element={<EditStudentInfo />} />
                  <Route path="school/staff" element={<School_Staffs />} />
                  <Route  path="school/staff/new" element={<NewStaffForm />} />
                  <Route  path="school/staff/edit/:id" element={<EditStaffInfo />} />
                  <Route path="admin/setting" element={<AccountSettingsAdmin />} />
                  <Route path="middleman-issue-page" element={<StaffPage />} />
                  <Route path="middleman-issue-page/:issueId" element={<IssueDetailsPage />} />
                </Routes>
              </DashboardLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
