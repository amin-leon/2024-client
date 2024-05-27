import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormatDate from "../../helpers/FormatDate";

const School_Students = () => {
  const [search, setSearch] = useState("");
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch('http://localhost:8080/api/school/positions/all');
        if (response.ok) {
          const data = await response.json();
          setPositions(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    fetchData();
  }, []);

  const filteredPositions = positions.filter((position) =>
    position.positionName.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPositions.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = async (studentId) => {
    try {
      const deleteStudent = await axios.delete(`http://localhost:8080/api/school/positions/delete/${studentId}`);
      if (deleteStudent) {
        window.location.href = 'http://localhost:3000/Home/school';
      }
    } catch (error) {
      console.error(`Delete clicked for student ID: ${studentId}`, error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto mt-8 px-16 border w-[90%] py-8 h-[90%]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Positions List</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="input input-bordered w-full max-w-xs"
          />
          <Link to="new">
            <button className="btn btn-primary">
              Add New
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-300 text-gray-700 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Position </th>
                <th className="py-3 px-6 text-left">Created</th>
                <th className="py-3 px-6 text-left">Updated</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentItems.map((student, index) => (
                <tr
                  key={student.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-gray-200`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">{student.positionName}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap"><FormatDate createOn={student?.createdAt} /></td>
                  <td className="py-3 px-6 text-left whitespace-nowrap"><FormatDate createOn={student?.updatedAt} /></td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <Link to={`edit/${student._id}`}>
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(student._id)}
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
      )}

      <div className="flex justify-end mt-4">
        <nav>
          <ul className="pagination flex space-x-2">
            {[...Array(Math.ceil(filteredPositions.length / itemsPerPage)).keys()].map((number) => (
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
