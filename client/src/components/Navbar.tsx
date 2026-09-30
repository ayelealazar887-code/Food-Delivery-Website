import React, { useState } from 'react';
import { assets } from '../assets/assets';

function Navbar() {
  const [activeMenu, setActiveMenu] = useState('home');

  const navLinks = [
    { name: 'home', label: 'Home' },
    { name: 'menu', label: 'Menu' },
    { name: 'mobile-app', label: 'Mobile App' },
    { name: 'contact-us', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <div className="flex-shrink-0 cursor-pointer">
          <img 
            src={assets.logo} 
            alt="Logo" 
            className="h-9 w-auto object-contain transition-transform duration-200 hover:scale-105" 
          />
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={`/${item.name}`}
              onClick={() => setActiveMenu(item.name)}
              className={`relative py-2 text-base font-medium capitalize transition-colors duration-200 ${
                activeMenu === item.name
                  ? 'text-orange-500 font-semibold'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              {item.label}
              {activeMenu === item.name && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full transition-all duration-300"></span>
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-6 sm:space-x-8">
          
          <button 
            aria-label="Search"
            className="p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200 focus:outline-none"
          >
            <img 
              src={assets.search_icon} 
              alt="Search Icon" 
              className="w-5 h-5 object-contain" 
            />
          </button>

          <div className="relative cursor-pointer p-2 hover:bg-orange-50 rounded-full transition-all duration-200">
            <img 
              src={assets.basket_icon} 
              alt="Cart Basket" 
              className="w-6 h-6 object-contain" 
            />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-orange-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </div>

          <button className="bg-transparent hover:bg-orange-500 text-gray-700 hover:text-white border border-orange-500 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
            Sign In
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;