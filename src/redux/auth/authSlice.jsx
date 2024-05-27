import { createSlice } from '@reduxjs/toolkit';
const storedAuthState = JSON.parse(sessionStorage.getItem('authState'));


const initialState = {
  user: storedAuthState?.user || null,
  loading: false,
  error: null,
  isLoggedIn: storedAuthState?.isLoggedIn || false,
  users:  storedAuthState ? storedAuthState.users : [],
  systemUsers: [], 
  inactiveUsers: [],
  pendingUsers: [],

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {


    setUsers: (state, action) => {
      state.users = action.payload;
      // Filter users and set them to systemUsers
      state.systemUsers = state.users.filter((user) => user.approvalStatus !== 'pending' && user.accountStatus !== 'inactive');
      state.inactiveUsers = state.users.filter((user) => user.accountStatus === 'inactive');
      state.pendingUsers = state.users.filter((user) => user.approvalStatus === 'pending');

      sessionStorage.setItem('authState', JSON.stringify({ user: state.user, isLoggedIn: state.isLoggedIn, users: state.users }));

    },

    deactivateAccount: (state, action) => {
      const userId = action.payload;

      // Find the user to deactivate in systemUsers
      const userToDeactivate = state.systemUsers.find((user) => user._id === userId);

      if (userToDeactivate) {
        // Deactivate the user by updating their accountStatus
        userToDeactivate.accountStatus = 'inactive';

        // Remove the user from systemUsers
        state.systemUsers = state.systemUsers.filter((user) => user._id !== userId);

        // Add the user to inactiveUsers
        state.inactiveUsers.push(userToDeactivate);
      }
    },

    activateAccount: (state, action) => {
      const userId = action.payload;

      const userToActivate = state.inactiveUsers.find((user) => user._id === userId);

      if (userToActivate) {
        userToActivate.accountStatus = 'active';
        state.inactiveUsers = state.inactiveUsers.filter((user) => user._id !== userId);
        state.systemUsers.push(userToActivate);
      }
    },

    approveAccount: (state, action) => {
      const userId = action.payload;

      // Find the user to approve in pendingUsers
      const userToApprove = state.pendingUsers.find((user) => user._id === userId);

      if (userToApprove) {
        // Approve the user by updating their approvalStatus
        userToApprove.approvalStatus = 'approved';

        // Remove the user from pendingUsers
        state.pendingUsers = state.pendingUsers.filter((user) => user._id !== userId);

        // Add the user to systemUsers
        state.systemUsers.push(userToApprove);
      }
    },






    registerUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setUsersAfterApprove: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
    rejectUser: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    },

    setInactiveUsers: (state, action) => {
      state.inactiveUsers = state.inactiveUsers.filter(user => user._id !== action.payload);
    },

    updateAdditionalUserInfo : (state, action)=>{
      const {fullName, email, username, role, position, level, faculty} = action.payload;
      state.user.email = email || state.user.email;
      state.user.username = username || state.user.username;
      state.user.fullName = fullName || state.user.fullName;
      state.user.role = role || state.user.role;
      state.user.position = position || state.user.position;
      state.user.level = level || state.user.level;
      state.user.faculty = faculty || state.user.faculty;

      sessionStorage.setItem('authState', JSON.stringify({ user: state.user, isLoggedIn: state.isLoggedIn }));
    },

    userInfoUpdate: (state, action)=>{
      const {fullName, email, username} = action.payload;
      state.user.email = email || state.user.email;
      state.user.username = username || state.user.username;
      state.user.fullName = fullName || state.user.fullName;
      sessionStorage.setItem('authState', JSON.stringify(state));
    },
    updatePassword: (state, action) => {
      state.user.password = action.payload;
    },
    // Login Actions..............................
    loginUserStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      loginUserSuccess: (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true; 
        sessionStorage.setItem('authState', JSON.stringify({ user: state.user, isLoggedIn: state.isLoggedIn }));
      },
      loginUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    //   Logout Action ................................
      logoutUser(state) {
        sessionStorage.removeItem('authState', 'authToken');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('issueState');


        window.location.replace('/');
      },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
