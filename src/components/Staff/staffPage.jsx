import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormatDate from '../helpers/FormatDate';




function StaffPage() {
  const unassignedIssues = useSelector((state) => state.issue.unassignedIssues);
  const totalNumberIssues = unassignedIssues.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState('');
  const itemsPerPage = 5;

  // Filter issues based on the search category
  const filteredIssues = unassignedIssues.filter((issue) =>
    issue.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const allIssues = useSelector((state) => state.issue.assignedIssues);
  const recentIssues = (allIssues.slice(0, 3));

  const indexOfLastIssue = currentPage * itemsPerPage;
  const indexOfFirstIssue = indexOfLastIssue - itemsPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReject = (issueId) => {
    console.log(`Reject clicked for issue ID: ${issueId}`);
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  return (
    <div className='md:pl-4 md:pr-4 md:pt-10 rounded-md'>
      <header className="bg-slate-200 p-5 text-black">
        <div className="container mx-auto flex justify-between items-center rounded-md">
          <h1 className="text-xl font-bold">New Issues</h1>
        </div>
      </header>
      <div className="md:flex md:p-8 border rounded-md">
        <div className="md:w-4/5 md:mr-8 border md:px-4">

          {/* Search by Category */}
          <div className="mb-4 py-8">
            <input
              type="text"
              id="category"
              value={searchCategory}
              onChange={handleCategoryChange}
              className="mt-1 p-2 border rounded-md"
              placeholder="Search category..."
            />
          </div>

          {/* Issues Table */}
          <div className="bg-white shadow-md overflow-x-scroll">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-300 text-gray-700 text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Date Reported</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {currentIssues.map((issue) => (
                  <tr key={issue._id} className="border-b border-gray-200">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <Link to={`/Home/middleman-issue-page/${issue._id}`}>
                        <span className="text-red-500 font-bold">{issue.title}</span>
                      </Link>
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {issue.category}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                        <FormatDate createOn={issue?.dateReported} />
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <button
                        onClick={() => handleReject(issue._id)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Pending
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4">
            <nav>
              <ul className="pagination flex space-x-2">
                {[...Array(Math.ceil(filteredIssues.length / itemsPerPage)).keys()].map(
                  (number) => (
                    <li key={number + 1} className="page-item">
                      <button
                        onClick={() => paginate(number + 1)}
                        className={`${
                          currentPage === number + 1 ? 'bg-blue-500 text-white' : 'hover:bg-blue-300'
                        } px-3 py-1 border rounded-md`}
                      >
                        {number + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
        <div className="md:w-1/5 border">
          <h5 className="text-md font-thin italic mb-4">Recent Assigned</h5>
          <div className="space-y-4">
          {recentIssues.map((issue) => (
              <Link key={issue._id} to={`/Home/middleman-issue-page/${issue._id}`}>
                <div className="bg-white p-4 shadow-md rounded-md">
                  <h2 className="text-sm font-semibold">{issue.title}</h2>
                  <p className='pt-3 text-gray-400'><FormatDate createOn={issue?.dateReported} /></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffPage;
