import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const EditStudentInfo = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    positionName: "",
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
      const editPosition = await axios.put(`http://localhost:8080/api/school/positions/update/${id}`, formData);
      if(editPosition){
        setLoading(false)
        setError("Position successfully Updated")
        setFormData('')
      }
    } catch (error) {
      console.log(error);
      setError("Position No Updated :)")
    }
  };

  // Populate data with edit form 
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/school/positions/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFormData({
          positionName: data.positionName || "",
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStudentData();

  }, [id]);


  return (
    <div className="container mx-auto mt-8 px-4 py-2">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Update Student Info</h2>
      <form onSubmit={handleSubmit} className="border p-24 grid grid-cols-2 gap-4">
        <div className="mb-4">
          <input
            type="text"
            id="name"
            placeholder="Enter name"
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
            Update
          </button>
          <p className="text-green-500">{error ? error: ""}</p>
        </div>
      </form>
    </div>
  );
};

export default EditStudentInfo;
