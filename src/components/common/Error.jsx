import React from 'react';

const Error = ({ error }) => {
  return (
    <div className="error text-red-800 font-bold underline">
      {error}
    </div>
  );
}

export default Error;
