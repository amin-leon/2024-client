import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ImageComponent() {
  const userInfo = useSelector((state) => state.auth.user);
  const userId = userInfo._id;

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/${userId}`);
        setImageUrl(response.data.profile);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    // Fetch user data every second
    const intervalId = setInterval(fetchUserData, 1000);

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        console.log('Please select an image.');
        return;
      }

      const formData = new FormData();
      formData.append('profileImage', image);

      const response = await axios.put(`http://localhost:8080/auth/update-profile-image/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile image submitted successfully:');
    } catch (error) {
      console.error('Error submitting profile image:', error);
    }
  };

  return (
    <div className="md:w-[90%] mt-1 md:p-1 bg-white rounded-lg shadow-xl">
      {imageUrl && (
        <div className="mb-4">
          <img src={`http://localhost:8080/`+imageUrl} alt="User's profile" className="mb-2 rounded-md" style={{ maxWidth: '200px' }} />
        </div>
          
      )}

      <h2 className="text-2xl mb-4 pb-7">Edit Profile Image</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageChange}
            className="border-none bg-gray-100 p-3 w-full rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Edit
        </button>
      </form>
    </div>
  );
}

export default ImageComponent;
