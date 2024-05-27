import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  issues: [],
  studentIssues: [],
  // Assigned to mstaff
  assignedToMe: [],
  newIssues: [],
  progressIssues: [],
  closedIssues: [],

  comments: [],
  loading: false,
  error: null,
  assignedTo: null,
  chatRoomIssue: [],
  IssueReporter: [],
  groupComment: [],
  StudentStaffComment:[],
  unassignedIssues: [],
  assignedIssues: [],
  
};

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {

    //Opened Issues on middleman page
    setIssues: (state, action) => {
      state.issues=action.payload;
      state.unassignedIssues = state.issues.filter((issue) => issue.status === 'open');
      state.assignedIssues = state.issues.filter((issue) => issue.status === 'assigned');

      },
      // delete opened issue from middleman page
      deleteIssue: (state, action)=>{
      const id= action.payload;
      state.issues = state.issues.filter((issue) => issue._id !== id);
    
      },

    //   delete opened issue from middleman page
      removeAssignedIssue: (state, action)=>{
        const issueId= action.payload;
        state.unassignedIssues = state.unassignedIssues.filter((issue) => issue._id !== issueId);

      },
      setAssignedTo: (state, action)=>{
        state.assignedTo = action.payload
      },
      setChatRoomIssue: (state, action)=>{
        state.chatRoomIssue = action.payload;
      },
      setIssueReporter: (state, action)=>{
        state.IssueReporter = action.payload;
      },
      setGroupComment: (state, action)=>{
        state.groupComment=(action.payload)
      },
      addGroupComment: (state, action) => {
        state.groupComment.push(action.payload);
      },
      addStaffStudentComment: (state, action) => {
        state.StudentStaffComment.push(action.payload);
      },
      setStaffStudentComment: (state, action) => {
        state.StudentStaffComment=(action.payload);
      },
      // Post notification
  
    
    // Assign an issue to staff
    assignIssueToStaffStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    assignIssueToStaffSuccess: (state, action) => {
      const { issueId, selectedStaff } = action.payload;
      const issueIndex = state.issues.findIndex((issue) => issue.id === issueId);
      if (issueIndex !== -1) {
        state.issues[issueIndex].assignedTo = selectedStaff;
      }
      state.loading = false;
      state.error = null;
    },
    assignIssueToStaffFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // student 
    getStudentIssue: (state, action)=>{
      state.issues =  action.payload;
      sessionStorage.setItem('issueState', JSON.stringify(state));
    },
    getIssueDetails: (state, action) => {
      state.studentIssues = action.payload;
    },
    // Issues assigned to logged in staff
    setAssignedToMe: (state, action) => {
      state.assignedToMe = action.payload;
      state.newIssues = state.assignedToMe.filter((issue) => issue.isRead === false);
      state.progressIssues = state.assignedToMe.filter((issue) => issue.isRead === true && issue.status === 'assigned');
      state.closedIssues = state.assignedToMe.filter((issue) => issue.status === 'closed' && issue.status === 'closed');
    },
    // CloseIssue
    setIssueToClose: (state, action) => {
      const issueId = action.payload;
      const feedback = action.payload;

      const issueToClose = state.assignedToMe.find((issue) => issue._id === issueId);

      if (issueToClose) {
        issueToClose.status = 'closed';
        issueToClose.feedback = feedback;
        state.assignedToMe = state.assignedToMe.filter((issue) => issue._id !== issueId);
        state.closedIssues.push(issueToClose);
        state.progressIssues = state.progressIssues.filter((issue) => issue._id !== issueId);

      }
    },
    commentsOnIssue: (state, action) => {
      state.comments = action.payload;
    },

    // delete attachment
    deleteAttachment(state, action) {
      const { attachmentId } = action.payload;
        state.studentIssues.issue.attachments = state.studentIssues.issue.attachments.filter(attachment => attachment._id !== attachmentId);
      },
    
            
  },
});

export const issueActions = issueSlice.actions;
export default issueSlice;
