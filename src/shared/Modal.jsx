import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa"; // Import the default icon

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  okTxt = "Add to Cart",
  closeTxt = "Cancel",
  icon = <FaShoppingCart className="mr-2" />, // Default icon set here
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onClick={onClose} // Closes modal when clicking outside the content
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full mx-4 p-6 relative transform transition-all duration-300 ease-in-out"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            <div className="flex justify-between items-center pb-4">
              {title && (
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {title}
                </h2>
              )}
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-4">
              {children}
            </div>
            {/* Footer with Close and Submit buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium transition-colors text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                {closeTxt}
              </button>
              <button
                onClick={onSubmit}
                className="px-4 py-2 text-sm font-medium flex justify-center items-center transition-colors text-white bg-slate-600 rounded-md hover:bg-slate-700  dark:bg-gray-600 dark:hover:bg-gray-700"
              >
                {/* Render the dynamic icon here */}
                {icon}
                {okTxt}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
