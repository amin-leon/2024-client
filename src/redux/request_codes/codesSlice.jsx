// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   codeRequests: [],
// };

// const codeSlice = createSlice({
//   name: 'codeRequests',
//   initialState,
//   reducers: {
//     setCodeRequests(state, action) {
//       // Filter codeRequests where in_use is true
//       state.codeRequests = action.payload.filter(codeRequest => codeRequest.in_use === true);
//     },
    // deleteCodeRequest(state, action) {
    //   state.codeRequests = state.codeRequests.filter(codeRequest => codeRequest.code !== action.payload);
    // },
//   },
// });

// export const codesActions = codeSlice.actions;
// export default codeSlice;



import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  codeRequests: [],
};

const codeSlice = createSlice({
  name: 'codeRequests',
  initialState,
  reducers: {
    setCodeRequests(state, action) {
    state.codeRequests = action.payload;
},
    deleteCodeRequest(state, action) {
      state.codeRequests = state.codeRequests.filter(codeRequest => codeRequest.code !== action.payload);
    },
    updateCodeRequest(state, action) {
        const updatedCodeRequest = action.payload;
        const filteredCodeRequests = state.codeRequests.filter(codeRequest => codeRequest.code !== updatedCodeRequest.code);
        state.codeRequests = [...filteredCodeRequests, updatedCodeRequest];
        state.codeRequests = state.codeRequests.filter(codeRequest => codeRequest.status !== 'Approved');
      },
  },
});

export const codesActions = codeSlice.actions;
export default codeSlice;