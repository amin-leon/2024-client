import React, { useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function AllUsers() {
  const systemUsers = useSelector((state) => state.auth.systemUsers);
  const usersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * usersPerPage;
  const currentUsers = systemUsers.slice(offset, offset + usersPerPage);

  const pageCount = Math.ceil(systemUsers.length / usersPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="container mx-auto my-10">
      <div className="pb-6">
        <p className="text-xl font-bold text-blue-500">Users List</p>
      </div>
      <p className="pb-3 font-bold">All Users</p>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-100 border-b'}>
              <td className="py-4 px-6 text-left">
                <Link to={`/Home/admin/manage-users/${user._id}`}>
                  <div className='flex items-center gap-4'>
                    <div className='text-green-500 text-4xl'><BsDot /></div>
                    <img className='w-10 h-10 rounded-full' src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80" alt="" />
                    <div className='font-semibold text-lg'>{user?.fullName}</div>
                  </div>
                </Link>
              </td>
              <td className="py-4 px-6 text-left font-semibold">{user?.role}</td>
              <td className="py-4 px-6 text-left">{user?.email}</td>
              <td className="py-4 px-6 text-left">
                <span className={`inline-block px-4 py-2 font-semibold ${user.accountStatus === 'active' ? 'text-green-900 bg-green-200' : 'text-red-900 bg-red-200'} rounded-full`}>
                  {user.accountStatus === 'active' ? 'Active' : 'Inactive'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default AllUsers;
