import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  documents: [],
  loading: false,
  error: null,
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    addDocument: (state, action) => {
      state.documents.push(action.payload);
    },
    deleteDocument: (state, action) => {
      state.documents = state.documents.filter(doc => doc._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setDocuments, addDocument, deleteDocument, setLoading, setError } = documentSlice.actions;
export default documentSlice.reducer;
