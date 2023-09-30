
import React from "react";

interface ConfirmationModalProps {
    onCancel: () => void;
    onConfirm: () => void;
  }

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onCancel, onConfirm }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-md shadow-lg">
          <p className="text-center mb-4">Are you sure you want to delete this package?</p>
          <div className="flex justify-center">
            <button
              className="bg-red-500 text-white px-4 py-2 mr-4 rounded-md"
              onClick={onConfirm}
            >
              OK
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export { ConfirmationModal }