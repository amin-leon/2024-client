import React, { useEffect } from 'react';
import { RiCheckLine } from 'react-icons/ri';

const ModalUpdate = ({ show, onClose }) => {
  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (show && event.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 modal-overlay">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <span className="absolute top-2 right-2 cursor-pointer text-gray-600" onClick={onClose}><RiCheckLine size={24} /></span>
        <p className="text-center mb-4">User details updated successfully!</p>
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">OK</button>
      </div>
    </div>
  );
};

export default ModalUpdate;
