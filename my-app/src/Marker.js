// src/Marker.js
import React from 'react';

const Marker = ({ x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',  // Center the marker at (x, y)
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'red',
        zIndex: 1000,  // Ensure markers appear above the map
      }}
    />
  );
};

export default Marker;
