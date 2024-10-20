import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Music, User, Menu, X } from "lucide-react";

const NavbarClient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            RebornMusic
          </h1>
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden md:flex space-x-4">
            <NavLink to="/" icon={<Home size={20} />} text="Home" />
            <NavLink to="/" icon={<Music size={20} />} text="Músicas" />
            <NavLink to="/my-profile" icon={<User size={20} />} text="My profile" />
          </nav>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 flex flex-col space-y-2 md:hidden">
            <NavLink to="/" icon={<Home size={20} />} text="Home" />
            <NavLink to="/" icon={<Music size={20} />} text="Músicas" />
            <NavLink to="/my-profile" icon={<User size={20} />} text="My profile" />
          </nav>
        )}
      </div>
    </div>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center space-x-2 text-white hover:text-indigo-400 transition-colors duration-200">
    {icon}
    <span>{text}</span>
  </Link>
);

export default NavbarClient;