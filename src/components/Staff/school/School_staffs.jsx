import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const School_Students = () => {
  const [search, setSearch] = useState("");
  const [staffs, setStaffs] = useState([]);


  // LIst of all staffs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/school/staff/all');
        if (response.ok) {
          const data = await response.json();
          setStaffs(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Change this to the desired number of items per page

  const filteredStaffs = staffs.filter((staff) =>
  staff.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStaffs.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddNew = () => {
    // console.log("Add New clicked");
  };

  const handleEdit = (studentId) => {
    // console.log(`Edit clicked for student ID: ${studentId}`);
  };

  const handleDelete = (studentId) => {
    // console.log(`Delete clicked for student ID: ${studentId}`);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };




  return (
    <div className="container mx-auto mt-8 px-8 border w-[80%] py-8 h-[90%]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">NPC Staffs List</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="px-4 py-2 border rounded-md"
          />
          <Link to="new">
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Add New
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-300 text-gray-700 text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Full Names</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Appointment</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentItems.map((staff, index) => (
              <tr
                key={staff._id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-gray-200`}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">{staff.surname}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{staff.name} </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{staff.email}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{staff.role}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{staff.position}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <Link to={`edit/${staff._id}`}>
                    <button
                      onClick={() => handleEdit(staff._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <nav>
          <ul className="pagination flex space-x-2">
            {[...Array(Math.ceil(filteredStaffs.length / itemsPerPage)).keys()].map((number) => (
              <li key={number + 1} className="page-item">
                <button
                  onClick={() => paginate(number + 1)}
                  className={`${
                    currentPage === number + 1 ? "bg-blue-500 text-white" : "hover:bg-blue-300"
                  } px-3 py-1 border rounded-md`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default School_Students;
