import React, { useState, useEffect } from "react"
import "./assets/styles/css/index.css"

const PreLoader = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

  return (
    <>
    <div className={`loader-container ${!isLoading && "loading-hidden"}`}>
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
