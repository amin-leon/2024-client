import axios from "axios";
import React, { useState } from "react";

const NewStaffForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    role: "",
    position: "",
    telephone: "",
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
      setLoading(true)
      const addNewStaff = await axios.post('http://localhost:8080/api/school/staff/register', formData);
      if(addNewStaff){
        setLoading(false)
        setError("new Staff is successfully registered")
        window.location.href = '/Home/school/staff'
      }
    } catch (error) {
      setError("Staff is no registered")
    }
  };

  return (
    <div className="container mx-auto mt-8 px-32 py-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Staff</h2>
      <form onSubmit={handleSubmit} className="border p-24 grid grid-cols-2 gap-2">
        <div className="mb-4">
          <input
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="surname"
            placeholder="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <select
            id="role"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
          >
            <option value="staff">Staff</option>
          </select>
        </div>

        <div className="mb-4">
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
          >
            <option value="">Appointment</option>
            <option value="dept.commdt">Dept Commandant</option>
            <option value="ci">Chief Instructor Offiver</option>
            <option value="io">Intelligent Officer</option>
            <option value="academic">Academic Officer</option>
            <option value="Doctor">Health doctor Officer</option>
            <option value="Rogistics">Logistcis Officer</option>
            <option value="oic">Course cordinator Officer- Undergraduent</option>
            <option value="admin">Admin Officer</option>
          </select>
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="telephone"
            placeholder="Telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
            autoSave="none"
          />
        </div>

        <div className="mt-4 col-span-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md border-none hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Add New
            Save {loading ? ".......": ''}
          </button>
          <p className="text-green-500">{error? error: ""}</p>
        </div>
      </form>
    </div>
  );
};

export default NewStaffForm;
