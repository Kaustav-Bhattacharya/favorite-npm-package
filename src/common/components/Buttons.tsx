import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className={`${
        disabled
          ? "bg-blue-200 text-gray-600 cursor-not-allowed"
          : "bg-blue-400 hover:bg-transparent hover:text-blue-400"
      } text-white font-semibold py-2 px-4 border rounded transition duration-300 ease-in-out`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const DangerButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className={`${
        disabled
          ? "bg-pink-200 text-pink-600 cursor-not-allowed"
          : "bg-red-400 hover:bg-transparent hover:text-red-400"
      } text-white font-semibold py-2 px-4 border rounded transition duration-300 ease-in-out`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { PrimaryButton, DangerButton };
