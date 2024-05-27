// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { issueActions } from "../../redux/issue/issueSlice";
// import { useDispatch } from "react-redux";
// import { GoCommentDiscussion } from 'react-icons/go';
// import { BsPeople } from "react-icons/bs";
// import FormatDate from "../helpers/FormatDate";

// function BoardIssuesTOChatOn() {
//   const dispatch = useDispatch();
//   const [chatroomIssues, setChatroomIssues] = useState([]);

//   useEffect(() => {
//     const fetchChatroomIssues = async () => {
//       const response = await axios.get('http://localhost:8080/issue/chatroom-issues');
//       const chatroomIssues = response.data;
//       dispatch(issueActions.setChatRoomIssue(chatroomIssues));
//       setChatroomIssues(chatroomIssues);

//       // reporter info
//       const reporterInfo = await axios.get('http://localhost:8080/auth/users');
//       dispatch(issueActions.setIssueReporter(reporterInfo.data));
//     };

//     fetchChatroomIssues();
//   }, [dispatch]);

//   return (
//     <div className='flex justify-center pt-10'>
//       <div className='h-screen w-[90%] max-auto bg-gray-100 p-5'>
//         <div className='p-10'>
//           <p className='text-2xl'>Staffs Chat Room</p>
//           <p className="text-sm pl-4">Click on card to share your point of view</p>
//         </div>
//         <hr />
//         <div className="h-auto w-[80%] grid grid-cols-3 gap-3">
//           {chatroomIssues.length > 0 ? (
//             chatroomIssues.map((chatroomIssue) => (
//               <Link to={`/Home/staff-chatboard/${chatroomIssue._id}`} key={chatroomIssue._id}>
//                 <div className="col-span-1 flex flex-col bg-white rounded-md mt-5">
//                   <div className="flex justify-between p-7 gap-5">
//                     <div className="flex gap-2">
//                       <div className="rounded-full bg-blue-400 text-white w-10 h-10 text-xl flex items-center justify-center">
//                         <BsPeople />
//                       </div>
//                       <div className="">{chatroomIssue.title}</div>
//                     </div>
//                     <div className="text-red-500 rounded-sm">{chatroomIssue.inDiscusion}</div>
//                   </div>
//                   <div className="flex flex-col pl-7">
//                     <p className="text-gray-400 text-xs"><FormatDate createOn={chatroomIssue.updatedAt} status='Posted On: ' /></p>
//                     <div className="flex items-center gap-1">
//                       <p>{chatroomIssue.groupComments.length}</p>
//                       <GoCommentDiscussion className="text-blue-500" />
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p className="col-span-3 text-center text-gray-500">No issue found here</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BoardIssuesTOChatOn;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { issueActions } from "../../redux/issue/issueSlice";
import { useDispatch } from "react-redux";
import { GoCommentDiscussion } from 'react-icons/go';
import { BsPeople } from "react-icons/bs";
import FormatDate from "../helpers/FormatDate";

function BoardIssuesTOChatOn() {
  const dispatch = useDispatch();
  const [chatroomIssues, setChatroomIssues] = useState([]);

  useEffect(() => {
    const fetchChatroomIssues = async () => {
      const response = await axios.get('http://localhost:8080/issue/chatroom-issues');
      const chatroomIssues = response.data;
      dispatch(issueActions.setChatRoomIssue(chatroomIssues));
      setChatroomIssues(chatroomIssues);

      // reporter info
      const reporterInfo = await axios.get('http://localhost:8080/auth/users');
      dispatch(issueActions.setIssueReporter(reporterInfo.data));
    };

    fetchChatroomIssues();
  }, [dispatch]);

  return (
    <div className="flex justify-center pt-10 bg-gray-50 min-h-[100%]">
      {/* w-[100%] bg-white p-6 rounded-lg shadow-lg */}
      <div className="w-full md:w-[90%] bg-white md:p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Staff Chat Room</h1>
          <p className="text-sm text-gray-600">Click on a card to share your point of view.</p>
        </div>
        <hr className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatroomIssues.length > 0 ? (
            chatroomIssues.map((chatroomIssue) => (
              <Link to={`/Home/staff-chatboard/${chatroomIssue._id}`} key={chatroomIssue._id}>
                <div className="flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-400 text-white w-10 h-10 flex items-center justify-center text-2xl">
                        <BsPeople />
                      </div>
                      <h2 className="text-lg font-medium text-gray-700">{chatroomIssue.title}</h2>
                    </div>
                    <span className="text-red-500 font-semibold">{chatroomIssue.inDiscusion}</span>
                  </div>
                  <div className="text-gray-600 text-sm mb-2">
                    <FormatDate createOn={chatroomIssue.updatedAt} status='Posted On: ' />
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <GoCommentDiscussion className="text-blue-500" />
                    <span>{chatroomIssue.groupComments.length}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">No issue found here</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoardIssuesTOChatOn;

