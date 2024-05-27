import {configureStore} from '@reduxjs/toolkit'
import authSlice from './auth/authSlice';
import issueSlice from './issue/issueSlice';
import feedbackSlice from './feedbacks/feeddbackSlice';
import codesSlice from './request_codes/codesSlice'; 
import documentReducer from './docs/docsSlice';
import notificationReducer from './notifications/notificationSlice';
import alertsReducer from './alerts/alertsSlice';


const savedAuthState = JSON.parse(sessionStorage.getItem('authState')) || {};

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        issue: issueSlice.reducer,
        feedbacks: feedbackSlice.reducer,
        codes: codesSlice.reducer, 
        documents: documentReducer,
        notifications: notificationReducer,
        alerts: alertsReducer


    },
    preloadedState: {
        auth: savedAuthState,
      },
})
export default store;