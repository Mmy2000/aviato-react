import React, { useState, Fragment, useContext, useEffect } from "react";
import { Switch, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { UserContext } from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../context/CartContext";
import { wishlistContext } from "../context/AddToFavoriteContext";
import {
  FaUser,
  FaHeart,
  FaSignOutAlt,
  FaUserPlus,
  FaSignInAlt,
  FaCogs,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { profile } = useContext(ProfileContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let { setcartInfo, cartInfo, displayCart } = useContext(CartContext);
  let { displayWishlist, wishCount, setwishCount } =
    useContext(wishlistContext);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  async function getCart() {
    let response = await displayCart();
    if (response && response.results) {
      setcartInfo(response || []);
    }
  }

  async function getWishlist() {
    let response = await displayWishlist();
    setwishCount(response?.data?.length);
  }

  function LogOut() {
    localStorage.removeItem("userTaken");
    setUserLogin(null);
    navigate("/login");
  }

  useEffect(() => {
    cartInfo;
    getCart();
    getWishlist();
  }, [cartInfo?.count]);

  const menuContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  // Utility styles for consistency and reuse
  const styles = {
    shared: `
    px-2 py-1 rounded-lg 
    transition-all duration-300 ease-in-out 
    transform
  `,
    hover: `
    hover:bg-gradient-to-r 
    from-gray-200 to-gray-400 
    dark:hover:from-blue-900 dark:hover:to-blue-800
  `,
    active: `
    text-slate-800 dark:text-slate-700 
    bg-gradient-to-r from-gray-100 to-gray-200 
    dark:from-blue-200 dark:to-blue-500 
    shadow-sm shadow-gray-400 dark:shadow-blue-900
  `,
    inactive: `
    text-gray-800 dark:text-gray-200 
    hover:text-blue-500
  `,
    underlineBase: `
    absolute -bottom-1 left-0 h-[2px] 
    bg-gradient-to-r from-blue-500 to-purple-500 
    origin-left rounded-full 
    transition-transform duration-300
  `,
    underlineStates: {
      active: "scale-x-100",
      inactive: "scale-x-0 hover:scale-x-100",
    },
  };

  // Generates the class for the link element
  const linkClass = (isActive) => `
  relative font-medium 
  ${styles.shared} 
  ${isActive ? styles.active : styles.inactive} 
  ${styles.hover}
`;

  // Generates the class for the underline element
  const underlineClass = (isActive) => `
  ${styles.underlineBase} 
  ${isActive ? styles.underlineStates.active : styles.underlineStates.inactive}
`;

  return (
    <nav className=" dark:bg-gray-900 inset-x-0  w-full sticky z-[100] top-0 left-0 border-b border-gray-200 dark:border-gray-900 bg-white/75 backdrop-blur-lg transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between py-3 items-center">
          {/* Logo */}
          <div className="flex justify-center items-center space-x-2 lg:space-x-20 ">
            <div className="flex-shrink-0">
              <NavLink to={"/"} className="flex items-center">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                  Aviato{" "}
                  <span className="text-green-600 hidden lg:inline">
                    Shopper
                  </span>
                </span>
              </NavLink>
            </div>

            {/* Main Menu */}
            <div className="hidden md:flex space-x-2">
              {["Products", "Categories", "Brands", "Contact"].map((page) => (
                <NavLink
                  key={page}
                  to={`/${page.toLowerCase()}`}
                  className={({ isActive }) => linkClass(isActive)}
                >
                  {page}
                  <span
                    className={({ isActive }) => underlineClass(isActive)}
                  />
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4 md:space-x-6 ">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center group px-3 py-1 rounded-lg transition-all duration-300 ease-in-out ${
                  isActive
                    ? "text-slate-800 dark:text-slate-700 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-blue-200 dark:to-blue-500 shadow-sm shadow-gray-400 dark:shadow-blue-900"
                    : "text-gray-800 dark:text-gray-200 hover:text-gray-700"
                }`
              }
            >
              <ShoppingCartIcon className="h-5 w-5 mr-1 text-gray-500 dark:text-gray-300 group-hover:text-gray-700 transition-transform duration-300" />
              <span className="font-medium">Cart</span>

              {/* Badge for Item Count */}
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform transition-transform duration-300 ease-in-out group-hover:scale-105">
                {cartInfo?.count && userLogin ? cartInfo?.count : 0}
              </span>
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `hidden relative md:flex items-center group px-3 py-1 rounded-lg transition-all duration-300 ease-in-out ${
                  isActive
                    ? "text-slate-800 dark:text-slate-700 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-blue-200 dark:to-blue-500 shadow-sm shadow-gray-400 dark:shadow-blue-900"
                    : "text-gray-800 dark:text-gray-200 hover:text-gray-700"
                }`
              }
            >
              <FaHeart className="h-5 w-5 mr-1 text-gray-500 dark:text-gray-300 group-hover:text-gray-700 transition-transform duration-300" />
              <span className="font-medium"></span>

              {/* Badge for Item Count */}
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform transition-transform duration-300 ease-in-out group-hover:scale-105">
                {wishCount && userLogin ? wishCount : 0}
              </span>
            </NavLink>
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
                  {profile && profile.image && userLogin ? (
                    <img
                      src={profile.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="w-6 h-6  text-gray-600 dark:text-gray-300" />
                  )}
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
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10 focus:outline-none">
                  {userLogin !== null ? (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to={"/profile"}
                            className={`flex items-center px-4 py-2 text-sm space-x-3 ${
                              active
                                ? "bg-gradient-to-r from-blue-50 dark:bg-gray-700 text-slate-600 dark:text-slate-800"
                                : "text-gray-700 dark:text-gray-200"
                            } transition duration-200 ease-in-out rounded-md`}
                          >
                            <FaUser className="w-5 h-5" />
                            <span>Profile</span>
                          </NavLink>
                        )}
                      </Menu.Item>
                      {profile?.user?.is_superadmin && (
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to={"/dashboard"}
                              className={`flex items-center px-4 py-2 text-sm space-x-3 ${
                                active
                                  ? "bg-gradient-to-r from-blue-50 dark:bg-gray-700 text-slate-600 dark:text-slate-800"
                                  : "text-gray-700 dark:text-gray-200"
                              } transition duration-200 ease-in-out rounded-md`}
                            >
                              <FaCogs className="w-5 h-5" />
                              <span>Dashboard</span>
                            </NavLink>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to={"/favorites"}
                            className={`flex items-center px-4 py-2 text-sm space-x-3 ${
                              active
                                ? "bg-gradient-to-r from-blue-50 dark:bg-gray-700 text-slate-600 dark:text-slate-800"
                                : "text-gray-700 dark:text-gray-200"
                            } transition duration-200 ease-in-out rounded-md`}
                          >
                            <FaHeart className="w-5 h-5" />
                            <span>Favorites</span>
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={LogOut}
                            className={`flex items-center px-4 py-2 text-sm space-x-3 ${
                              active
                                ? "bg-gradient-to-r from-blue-50 dark:bg-gray-700 text-slate-600 dark:text-slate-800"
                                : "text-gray-700 dark:text-gray-200"
                            } transition duration-200 ease-in-out rounded-md cursor-pointer`}
                          >
                            <FaSignOutAlt className="w-5 h-5" />
                            <span>Logout</span>
                          </span>
                        )}
                      </Menu.Item>
                    </>
                  ) : (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to={"/login"}
                            className={`flex items-center px-4 py-2 text-sm space-x-3 ${
                              active
                                ? "bg-gradient-to-r from-blue-50 dark:bg-gray-700 text-slate-600 dark:text-slate-800"
                                : "text-gray-700 dark:text-gray-200"
                            } transition duration-200 ease-in-out rounded-md`}
                          >
                            <FaSignInAlt className="w-5 h-5" />
                            <span>Login</span>
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to={"/register"}
                            className={`flex items-center px-4 py-2 text-sm space-x-3 ${
                              active
                                ? "bg-gradient-to-r from-blue-50 dark:bg-gray-700 text-slate-600 dark:text-slate-800"
                                : "text-gray-700 dark:text-gray-200"
                            } transition duration-200 ease-in-out rounded-md`}
                          >
                            <FaUserPlus className="w-5 h-5" />
                            <span>Register</span>
                          </NavLink>
                        )}
                      </Menu.Item>
                    </>
                  )}
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
        <motion.div
          className="md:hidden bg-white dark:bg-gray-900  dark:border-gray-700 "
          initial="hidden"
          animate="visible"
          variants={menuContainerVariants}
        >
          <nav className="px-4 pt-4 pb-6 space-y-4">
            {["Products", "Categories", "Brands", "Contact"].map(
              (page, index) => (
                <motion.div
                  key={page}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <NavLink
                    key={page}
                    to={`/${page.toLowerCase()}`}
                    className={({ isActive }) => linkClass(isActive)}
                  >
                    {page}
                    <span
                      className={({ isActive }) => underlineClass(isActive)}
                    />
                  </NavLink>
                </motion.div>
              )
            )}
          </nav>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
