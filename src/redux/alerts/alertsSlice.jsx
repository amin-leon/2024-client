import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    
    setAlerts: (state, action) => {
      state.alerts = action.payload;
    },
    markAsRead: (state, action) => {
      const alertsId = action.payload;
      const alertsIndex = state.alerts.findIndex((alert) => alert._id === alertsId);
    
      if (alertsIndex !== -1) {
        state.alerts[alertsIndex].isRead = true;
      }
    },
    
    
    markAsUnread: (state, action) => {
      const alertsId = action.payload;
      state.alerts = state.alerts.map((alert) =>
        alert._id === alertsId ? { ...alert, isRead: false } : alert
      );
    },
    removeNotification: (state, action) => {
      const alertsId = action.payload;
      state.alerts = state.alerts.filter((alert) => alert._id !== alertsId);
    },
  },
});

export const alertsActions = alertsSlice.actions;


export default alertsSlice.reducer;
