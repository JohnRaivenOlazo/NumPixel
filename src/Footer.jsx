import React from "react"
import {Fade} from 'react-awesome-reveal'

const Footer = () => {
  return (
          <Fade>
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Numerical Methods</h3>
            <p className="text-sm text-gray-300 mb-4">
              Numerical methods are the backbone of modern mathematical analysis, enabling the solution of complex problems through computational techniques.
            </p>
            <p className="text-sm text-gray-300">
              This platform is dedicated to exploring and advancing numerical methods to enhance problem-solving capabilities across various domains.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Developer Information</h3>
            <p className="text-sm text-gray-300 mb-4">
              Name: John Raiven D. Olazo
            </p>
            <p className="text-sm text-gray-300">
              Contact: +63 912-428-9235
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore More</h3>
            <ul className="text-sm text-gray-300">
              <li className="mb-2"><a href="https://en.wikipedia.org/wiki/Numerical_analysis" className="hover:text-pink-500 transition duration-300">Documentation</a></li>
              <li className="mb-2"><a href="https://www.tutorialspoint.com/numerical_methods/index.htm" className="hover:text-pink-500 transition duration-300">Tutorials</a></li>
              <li className="mb-2"><a href="https://www.mathworks.com/discovery/numerical-analysis.html" className="hover:text-pink-500 transition duration-300">Blog</a></li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-700 my-8" />
        <div className="flex justify-center">
          <a href="#header" className="text-sm text-gray-300 hover:text-white transition duration-300">Back to Top</a>
        </div>
        <div className="text-sm text-center text-gray-300 mt-4">
          © {new Date().getFullYear()} NumPixel. All Rights Reserved.
        </div>
      </div>
    </footer>
        </Fade>
  )
}

export default Footer
