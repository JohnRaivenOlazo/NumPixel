import React, { useState, useEffect } from "react"
import "./assets/styles/css/index.css"

const PreLoader = () => {

	const [isShown, setIsShown] = useState(false);

	useEffect(() => {
	  setTimeout(() => {
		setIsShown(true);
	  }, 3000);
	}, []);

  return (
    <>
    <div className={`loader-container ${isShown && "loading-hidden"}`}>
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
    </>
  )
}

export default PreLoader
