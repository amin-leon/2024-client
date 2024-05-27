import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    
    setNots: (state, action) => {
      state.notifications = action.payload;
    },
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notificationIndex = state.notifications.findIndex((notification) => notification._id === notificationId);
    
      if (notificationIndex !== -1) {
        state.notifications[notificationIndex].isRead = true;
      }
    },
    
    
    markAsUnread: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.map((notification) =>
        notification._id === notificationId ? { ...notification, isRead: false } : notification
      );
    },
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter((notification) => notification._id !== notificationId);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

// export const { setNots, markAsRead, markAsUnread, removeNotification } = notificationSlice.actions;
export const notificationActions = notificationSlice.actions;


export default notificationSlice.reducer;
