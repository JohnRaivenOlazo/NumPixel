import React, { useEffect, useState } from 'react';
import "./assets/styles/css/index.css";

const PreLoader = ({ onVideoLoad }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update isLoading state when the video is loaded
    if (onVideoLoad) {
      setIsLoading(true);
    }

    // Add a delay before setting isLoading to false
    const delayTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the delay time as needed

    // Clear the timeout when the component unmounts or when the video is loaded
    return () => {
      clearTimeout(delayTimeout);
    };
  }, [onVideoLoad]); // Trigger effect when onVideoLoad changes

  return (
    <div className={`loader-container ${isLoading ? '' : 'loading-hidden'}`}>
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
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
