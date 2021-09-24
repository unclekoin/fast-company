import React from 'react';

const Qualities = ({ name, color }) => {
  return (
    <span className={`badge bg-${color} me-1`}>
      {name}
    </span>
  );
};

export default Qualities;
