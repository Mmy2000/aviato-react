import React, { useState, Fragment } from "react";
import { Switch, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow fixed w-full z-30 top-0 left-0 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between py-3 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                Aviato
              </span>
            </a>
          </div>

          {/* Main Menu */}
          <div className="hidden md:flex space-x-8">
            {["Products", "Pricing", "Blog"].map((page) => (
              <a
                key={page}
                href={`/${page.toLowerCase()}`}
                className="relative text-gray-800 dark:text-gray-200 font-medium transition-all duration-200 ease-out transform hover:scale-105 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
              >
                {page}
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-6">
            {/* Dark mode toggle */}
            <Switch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              className={`${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/50"
                  : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-12 transition-all duration-300 ease-in-out`}
            >
              <span
                className={`${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                } inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300`}
              />
              {isDarkMode ? (
                <MoonIcon className="absolute left-1 w-4 h-4 text-blue-300" />
              ) : (
                <SunIcon className="absolute right-1 w-4 h-4 text-yellow-400" />
              )}
            </Switch>

            {/* User Menu with HeadlessUI Menu and Transition */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center text-sm focus:outline-none">
                  <UserCircleIcon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-300 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-200 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10 focus:outline-none">
                  {["Profile", "Login", "Register", "Logout"].map((item) => (
                    <Menu.Item key={item}>
                      {({ active }) => (
                        <a
                          href={`/${item.toLowerCase()}`}
                          className={`block px-4 py-2 text-sm ${
                            active
                              ? "bg-gradient-to-r from-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-200"
                          } transition duration-200 ease-in-out rounded-md`}
                        >
                          {item}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition duration-200"
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
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {["Products", "Pricing", "Blog"].map((page) => (
              <a
                key={page}
                href={`/${page.toLowerCase()}`}
                className="block text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium py-2"
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
