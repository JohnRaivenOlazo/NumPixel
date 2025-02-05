// PreLoader.jsx

import React from 'react';
import '../../App';
import '../../assets/styles/css/index.css';

const PreLoader = ({ progress }) => {
  return (
    <div className="loader-container">
      <div className="page">
        <div className="loadContainer">
          <div className="loadInner">
            <div className="loadCircle">
              <div className="loadCircleInner"></div>
            </div>
            <div className="loadCircle">
              <div className="loadCircleInner"></div>
            </div>
            <div className="loadCircle">
              <div className="loadCircleInner"></div>
            </div>
            <div className="loadCircle">
              <div className="loadCircleInner"></div>
            </div>
            <div className="loadCircle">
              <div className="loadCircleInner"></div>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="loading-text">Loading NumPixel...</div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
