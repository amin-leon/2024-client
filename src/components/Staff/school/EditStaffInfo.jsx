import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditStaffInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {id} = useParams();
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

    // Populate data with edit form 
    useEffect(() => {
      const fetchStudentData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/school/staff/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setFormData({
            name: data.name || "",
            surname: data.surname || "",
            telephone: data.telephone || "",
            email: data.email || "",
            role: data.role || "",
            position: data.position || "",
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchStudentData();
  
    }, [id]);

    const handleSubmit = async(e) => {
      e.preventDefault()
      try {
        setLoading(true)
        const editStaff = await axios.put(`http://localhost:8080/api/school/staff/update/${id}`, formData);
        if(editStaff){
          setLoading(false)
          setError("Staff successfully Updated")
          setFormData('')
        }
      } catch (error) {
        console.log(error);
        setError("Staff No Updated :)")
      }
    };

  return (
    <div className="container mx-auto mt-8 px-32 py-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Staff Info</h2>
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
            <option value="teacher">Teacher</option>
            <option value="staff">Staff</option>
            {/* Add more options as needed */}
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
            <option value="lecturer">Lecturer</option>
            <option value="assistant">Assistant</option>
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
            Update
          </button>
          <p className="text-green-500">{error ? error: ""}</p>
        </div>
      </form>
    </div>
  );
};

export default EditStaffInfo;
