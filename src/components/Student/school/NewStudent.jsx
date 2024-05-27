import React, { useState } from "react";
import axios from "axios"

const NewStudentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const addNewStudent = await axios.post('http://localhost:8080/api/school/positions/register', formData);
      setLoading(false)
      setError(addNewStudent.data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  

  return (
    <div className="container mx-auto mt-8 px-24 py-2">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Position</h2>
      <form onSubmit={handleSubmit} className="border p-16 grid grid-cols-2 gap-4">
        <div className="mb-4">
          <input
            type="text"
            id="name"
            placeholder="Enter Position"
            name="positionName"
            value={formData.positionName}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
          />
        </div>

        <div className="mt-4 col-span-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Save {loading ? ".......": ''}
          </button>
          <p className="text-green-500">{error? error: ""}</p>
        </div>
      </form>
    </div>
  );
};

export default NewStudentForm;
