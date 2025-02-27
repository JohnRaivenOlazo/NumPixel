import React from "react"
import { Fade } from 'react-awesome-reveal'

const Footer = () => {
  return (
    <footer className="relative bg-[#1a1a1a] text-white py-16 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[url('/logo.png')] bg-center opacity-[0.02]" />
      
      <Fade cascade triggerOnce> 
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* About Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 p-2
                  shadow-lg shadow-purple-500/20">
                  <img src="/logo.png" alt="NumPixel Logo" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                  NumPixel
                </h2>
              </div>
              
              <div className="max-w-md">
                <p className="text-gray-400 leading-relaxed">
                  Numerical methods are the backbone of modern mathematical analysis, enabling the solution of complex problems through computational techniques.
                </p>
                <p className="text-gray-400 leading-relaxed mt-4">
                  This platform is dedicated to exploring and advancing numerical methods to enhance problem-solving capabilities across various domains.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                  Resources
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://en.wikipedia.org/wiki/Numerical_analysis" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform duration-200" />
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tutorialspoint.com/numerical_methods/index.htm" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform duration-200" />
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mathworks.com/discovery/numerical-analysis.html" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform duration-200" />
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                  Legal
                </h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => {}} 
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform duration-200" />
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {}} 
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:scale-150 transition-transform duration-200" />
                      Terms of Service
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-16 pt-8 border-t border-purple-900/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} NumPixel. All rights reserved.
                </p>
                <a 
                  href="#header" 
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200
                    flex items-center gap-2 group order-first md:order-last"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-200" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>Back to Top</span>
                </a>
              </div>
              
              {/* Social Links - Optional */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/JohnRaivenOlazo/NumPixel" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </footer>
  )
}

export default Footer
