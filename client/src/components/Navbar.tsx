import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

function Navbar({
  setShowLogin,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { getTotalCartAmount, token, setToken } =
    React.useContext(StoreContext) || {
      getTotalCartAmount: () => 0,
      token: "",
      setToken: () => {},
    };

  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "home", label: "Home", id: "home" },
    { name: "menu", label: "Menu", id: "menu" },
    { name: "mobile-app", label: "Mobile App", id: "mobile-app" },
    { name: "contact-us", label: "Contact Us", id: "contact-us" },
  ];

  const handleNavClick = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", {
        state: {
          scrollTo: id,
        },
      });
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button
          onClick={() => handleNavClick("home")}
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
              onClick={() => handleNavClick(item.id)}
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

          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-transparent hover:bg-orange-500 text-gray-700 hover:text-white border border-orange-500 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            >
              Sign In
            </button>
          ) : (
            <div className="relative group">
              <button className="p-1 rounded-full hover:bg-orange-50 transition-all duration-200">
                <img
                  src={assets.profile_icon}
                  alt="Profile"
                  className="w-8 h-8 object-contain"
                />
              </button>

              <ul className="absolute right-0 top-12 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <li>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                  >
                    <img
                      src={assets.bag_icon}
                      alt="Orders"
                      className="w-5 h-5"
                    />
                    <p>Orders</p>
                  </Link>
                </li>

                <hr className="border-gray-100" />

                <li>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                  >
                    <img
                      src={assets.logout_icon}
                      alt="Logout"
                      className="w-5 h-5"
                    />
                    <p>Logout</p>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;