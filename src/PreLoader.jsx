// PreLoader.jsx

import React, { useEffect, useState } from 'react';
import './App'
import './assets/styles/css/index.css';
const PreLoader = () => {
  return (
    <div className="loader-container">
      <div className={`page`}>
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
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
