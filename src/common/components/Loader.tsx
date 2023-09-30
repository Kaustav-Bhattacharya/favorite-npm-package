import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-16 h-16 animate-spin border-t-2 border-blue-500 border-solid rounded-full bg-white"></div>
    </div>
  );
};

export { Loader };
