import React from 'react';

const InterpolationTitle = ({ title }) => {
  return (
    <p className="text-2xl shadow-xl rounded-md font-bold mb-4 p-1 px-5 text-white text-center transition-all duration-300 ease transform bg-transparent  bg-opacity-75">
      {title}
    </p>
  );
};

export default InterpolationTitle
