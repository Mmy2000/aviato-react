import React from "react";
import { motion } from "framer-motion";

const ChangePassword = ({ formData, onInputChange }) => {
  // Animation variants for inputs
  const inputVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Animation variants for labels
  const labelVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="space-y-8 p-6 "
    >
      {/* Current Password */}
      <motion.div
        className="flex flex-col"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.label
          htmlFor="currentPassword"
          className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
          variants={labelVariants}
        >
          Current Password
        </motion.label>
        <motion.input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={onInputChange}
          placeholder="Enter your current password"
          className="mt-2 p-3 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900 dark:text-gray-100 transition duration-300 ease-in-out hover:shadow-md"
          variants={inputVariants}
          aria-required="true"
        />
      </motion.div>

      {/* New Password */}
      <motion.div
        className="flex flex-col"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.label
          htmlFor="newPassword"
          className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
          variants={labelVariants}
        >
          New Password
        </motion.label>
        <motion.input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={onInputChange}
          placeholder="Enter your new password"
          className="mt-2 p-3 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900 dark:text-gray-100 transition duration-300 ease-in-out hover:shadow-md"
          variants={inputVariants}
          aria-required="true"
        />
      </motion.div>

      {/* Confirm New Password */}
      <motion.div
        className="flex flex-col"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
          variants={labelVariants}
        >
          Confirm New Password
        </motion.label>
        <motion.input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onInputChange}
          placeholder="Re-enter your new password"
          className="mt-2 p-3 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900 dark:text-gray-100 transition duration-300 ease-in-out hover:shadow-md"
          variants={inputVariants}
          aria-required="true"
        />
      </motion.div>

      
    </motion.div>
  );
};

export default ChangePassword;
