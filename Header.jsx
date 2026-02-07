import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="group relative z-10">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg tracking-tighter shadow-lg group-hover:scale-105 transition-transform duration-300">
                SKT
              </div>
            </a>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden md:flex space-x-10 items-center absolute left-1/2 transform -translate-x-1/2">
            {['Home', 'Shop', 'New Arrivals', 'Collections'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors tracking-wide relative group"
              >
                {item}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
            <a href="/sale" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors tracking-wide">
              Sale
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Location Button */}
            <button className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors group px-2 py-1 rounded-md hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-black transition-colors">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-xs font-medium uppercase tracking-wider">Set Location</span>
            </button>

            {/* Cart Icon */}
            <button className="relative p-2 text-gray-600 hover:text-black transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white ring-2 ring-white">
                2
              </span>
            </button>

            {/* Login / Sign Up */}
            <a href="/login" className="px-6 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-semibold transition-all duration-300 hover:shadow-md">
              Log in / Sign up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button className="relative p-2 text-gray-600 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white ring-2 ring-white">
                2
              </span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-black focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-40 animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 pt-4 pb-8 space-y-3">
            {['Home', 'Shop', 'New Arrivals', 'Collections', 'Sale'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className={`block px-4 py-3 rounded-lg text-base font-medium ${item === 'Sale' ? 'text-red-600 bg-red-50' : 'text-gray-700 hover:bg-gray-50'} transition-colors`}
              >
                {item}
              </a>
            ))}
            <div className="border-t border-gray-100 my-4 pt-4 space-y-4">
               <button className="flex items-center gap-3 text-gray-600 px-4 w-full hover:bg-gray-50 py-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm font-medium">Set Location</span>
              </button>
              <div className="px-4">
                <a href="/login" className="block w-full text-center px-5 py-3 rounded-full bg-black text-white text-sm font-bold shadow-md hover:bg-gray-800 transition-colors">
                  Log in / Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;