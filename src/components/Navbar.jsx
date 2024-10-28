import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-20 top-0 left-0 transition duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Aviato
              </span>
            </a>
          </div>

          {/* Main Menu */}
          <div className="hidden md:flex space-x-4">
            {['Products', 'Pricing', 'Blog'].map((page) => (
              <a
                key={page}
                href={`/${page.toLowerCase()}`}
                className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition font-medium"
              >
                {page}
              </a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <Switch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              className={`${
                isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
            >
              <span
                className={`${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
              {isDarkMode ? (
                <MoonIcon className="absolute left-1 w-4 h-4 text-white" />
              ) : (
                <SunIcon className="absolute right-1 w-4 h-4 text-yellow-500" />
              )}
            </Switch>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center text-sm focus:outline-none"
              >
                <UserCircleIcon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  {['Profile', 'Login', 'Register', 'Logout'].map((item) => (
                    <a
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Products', 'Pricing', 'Blog'].map((page) => (
              <a
                key={page}
                href={`/${page.toLowerCase()}`}
                className="block text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition font-medium"
              >
                {page}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
