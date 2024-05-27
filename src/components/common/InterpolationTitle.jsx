import React from 'react';

const InterpolationTitle = ({ title }) => {
  return (
    <p className="text-2xl shadow-lg rounded-full font-bold mb-4 p-2 px-5 text-purple-900 text-center uppercase transition-all duration-300 ease transform hover:-translate-y-1">
      {title}
    </p>
  );
};

export default InterpolationTitle
