import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void; // You can add onClick event handler if needed
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-blue-400 hover:bg-transparent hover:text-blue-400 text-white font-semibold py-2 px-4 border hover:border-blue-400 rounded transition duration-300 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
};


const DangerButton: React.FC<ButtonProps> = ({ children, onClick}) => {
  return (
    <button onClick={onClick} className="bg-red-400 hover:bg-transparent hover:text-red-400 text-white font-semibold py-2 px-4 border hover:border-red-400 rounded transition duration-300 ease-in-out">
      {children}
    </button>
  );
};

export { PrimaryButton, DangerButton };
