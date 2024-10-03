// app/components/Navbar.tsx

import React, { useEffect, useState } from 'react';

import { GiMoonBats } from "react-icons/gi";
import { GiBarbedSun } from "react-icons/gi";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // On component mount, check localStorage for theme preference
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  // Toggle between dark and light mode
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-gray-800 text-white dark:bg-gray-900">
      {/* Left side: Logo */}
      <div className="flex items-center">
        {/* <Link to="/" className="text-xl font-bold"> */}
          YourLogo
        {/* </Link> */}
      </div>

      {/* Right side: Theme toggle button */}
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-gray-600 hover:border-white focus:outline-none"
        >
          {isDarkMode ? (
            <GiBarbedSun className="h-5 w-5 text-yellow-300" />
          ) : (
            <GiMoonBats className="h-5 w-5 text-gray-300" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
