import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

const passwordModal = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg z-10 relative">
            <button className="absolute top-4 right-4 text-gray-700" onClick={onClose}>
              <RiCloseCircleLine size={24} />
            </button>
            <h2 className="text-2xl mb-4 pb-2 border-b border-gray-300">Modal Title</h2>
            <p>This is the modal content.</p>
            {/* Add your content here */}

            {/* Close button */}
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default passwordModal;
