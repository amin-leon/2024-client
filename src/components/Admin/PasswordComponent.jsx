import React, { useState } from 'react';
import axios from 'axios';
import { authActions } from '../../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function PasswordComponent() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const userId = userInfo._id;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/auth/user/setting/${userId}/password`, {
        password,
      });
      dispatch(authActions.updatePassword(password));
      alert("Password changed successfully");
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className="md:w-[90%] mt-1 md:p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl mb-4 pb-7">Change account Password</h2>
      <form onSubmit={handleSubmit} className='md:p-8'>
        <div className="mb-4">
          <input
            type="password"
            id="currentPassword"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-none bg-gray-100 p-3 w-full rounded-md"
            placeholder='Type new password'
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-none bg-gray-100 p-3 w-full rounded-md"
            placeholder='Confirm password'
            required
          />
          {passwordMatchError && <p className="text-red-500">{passwordMatchError}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Edit
        </button>
      </form>
    </div>
  );
}

export default PasswordComponent;
