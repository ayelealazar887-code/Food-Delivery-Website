import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

function Navbar({
  setShowLogin,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { getTotalCartAmount } = React.useContext(StoreContext) || {
    getTotalCartAmount: () => 0,
  };

  const navLinks = [
    { name: "home", label: "Home", id: "home" },
    { name: "menu", label: "Menu", id: "menu" },
    { name: "mobile-app", label: "Mobile App", id: "mobile-app" },
    { name: "contact-us", label: "Contact Us", id: "contact-us" },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button
          onClick={() => {
            if (window.location.pathname !== "/") {
              window.location.href = "/";
            } else {
              scrollToSection("home");
            }
          }}
          className="flex-shrink-0 cursor-pointer"
        >
          <img
            src={assets.logo}
            alt="Logo"
            className="h-9 w-auto object-contain"
          />
        </button>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="relative py-2 text-base font-medium text-gray-600 hover:text-orange-500 transition-colors duration-200"
            >
              {item.label}
            </button>
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

          <Link
            to="/cart"
            className="relative cursor-pointer p-2 hover:bg-orange-50 rounded-full transition-all duration-200"
          >
            <img
              src={assets.basket_icon}
              alt="Cart Basket"
              className="w-6 h-6 object-contain"
            />

            {getTotalCartAmount() > 0 && (
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-orange-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </Link>

          <button
            onClick={() => setShowLogin(true)}
            className="bg-transparent hover:bg-orange-500 text-gray-700 hover:text-white border border-orange-500 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
