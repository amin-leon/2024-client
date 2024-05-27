import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feedbacks: [],
};

const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {
    setFeedbacks(state, action) {
      state.feedbacks = action.payload;
    },
    deleteFeedback(state, action) {
      state.feedbacks = state.feedbacks.filter(feedback => feedback.id !== action.payload);
    },
    updateFeedback(state, action) {
      const updatedFeedback = action.payload;
      const filteredFeedbacks = state.feedbacks.filter(feedback => feedback.id !== updatedFeedback.id);
      state.feedbacks = [...filteredFeedbacks, updatedFeedback];
    },
  },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice;
