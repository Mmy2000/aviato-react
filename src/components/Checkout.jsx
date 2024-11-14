import React from "react";
import { motion } from "framer-motion";

const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-12  transition-colors duration-500">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Billing Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full lg:w-2/3 bg-white dark:bg-gray-800 p-10 shadow-md rounded-xl transition-colors duration-500"
        >
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8">
            Billing Details
          </h2>
          <form className="grid grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="First Name"
              className="col-span-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="col-span-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              type="email"
              placeholder="Email"
              className="col-span-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="col-span-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              type="text"
              placeholder="Address Line 1"
              className="col-span-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              type="text"
              placeholder="Address Line 2"
              className="col-span-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              type="text"
              placeholder="State"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              type="text"
              placeholder="City"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              type="text"
              placeholder="Country"
              className="col-span-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <textarea
              placeholder="Order Notes (Optional)"
              className="col-span-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 h-28 resize-none transition"
            ></textarea>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full lg:w-1/3 bg-white h-fit dark:bg-gray-800 p-8 shadow-md rounded-xl transition-colors duration-500"
        >
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <img
                src="path_to_product_image"
                alt="Product"
                className="w-16 h-16 rounded-md border dark:border-gray-600"
              />
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  Product Name
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  4 x $220.00
                </p>
              </div>
              <button className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition">
                Remove
              </button>
            </div>
            <div className="flex items-center justify-between">
              <img
                src="path_to_product_image"
                alt="Product"
                className="w-16 h-16 rounded-md border dark:border-gray-600"
              />
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  Product Name
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  3 x $220.00
                </p>
              </div>
              <button className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition">
                Remove
              </button>
            </div>
          </div>
          <div className="border-t dark:border-gray-700 pt-4 mt-4 text-gray-700 dark:text-gray-300 space-y-2">
            <p className="flex justify-between">
              <span>Subtotal:</span> <span>$1540.00</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping:</span> <span>$30.80</span>
            </p>
            <p className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span> <span>$1570.80</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-10 mt-12 shadow-md rounded-xl transition-colors duration-500"
      >
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
          Select Payment Method
        </h2>
        <div className="space-y-4">
          <label className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200">
            <input
              type="radio"
              name="payment_method"
              className="mr-3 focus:ring-blue-600"
            />
            <span className="font-medium">PayPal</span>
          </label>
          <label className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200">
            <input
              type="radio"
              name="payment_method"
              className="mr-3 focus:ring-blue-600"
            />
            <span className="font-medium">Stripe</span>
          </label>
          <label className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200">
            <input
              type="radio"
              name="payment_method"
              className="mr-3 focus:ring-blue-600"
            />
            <span className="font-medium">Cash on Delivery</span>
          </label>
        </div>
        <button className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 transition text-white font-semibold w-full py-4 mt-8 rounded-md">
          Place Order
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          Secure Payment: All transactions are encrypted and protected.
        </p>
      </motion.div>
    </div>
  );
};

export default Checkout;
