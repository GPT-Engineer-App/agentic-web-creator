import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg">Web App Generator</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/preview" className="text-gray-300 hover:text-white">Preview</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;