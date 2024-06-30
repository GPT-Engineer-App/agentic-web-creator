import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  return (
    <nav className="w-full bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg">{t('welcome')}</Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">{t('home')}</Link>
          <Link to="/preview" className="text-gray-300 hover:text-white">{t('preview')}</Link>
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="text-gray-300 bg-gray-800 border-none"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;