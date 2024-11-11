import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const [cartDetails, setCartDetails] = useState([]);
  const { displayCart } = useContext(CartContext);

  async function getCart() {
    let response = await displayCart();
    if (response && response.results) {
      setCartDetails(response.results || []);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Calculate total amount for all items in cart
  const calculateTotal = () => {
    return cartDetails.reduce(
      (total, item) => total + item.product_price * item.quantity,
      0
    );
  };

  // Calculate total tax amount for all items in cart
  const calculateTotalTax = () => {
    return cartDetails.reduce((totalTax, item) => {
      return totalTax + (item.tax_amount || 0);
    }, 0);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        Shopping Cart
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          {cartDetails && cartDetails.length > 0 ? (
            <div className="space-y-6">
              <AnimatePresence>
                {cartDetails.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex justify-between items-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={itemVariants}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Product Image and Details */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div>
                        <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
                          {item.product_name}
                        </div>
                        {item.variation_details.map((variation, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-500 dark:text-gray-400"
                          >
                            {variation.variation_category}:{" "}
                            {variation.variation_value}
                          </div>
                        ))}
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Price: ${Number(item.product_price).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <button className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-300">
                        -
                      </button>
                      <span className="text-gray-700 dark:text-gray-200">
                        {item.quantity}
                      </span>
                      <button className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-300">
                        +
                      </button>
                    </div>

                    {/* Total Price and Remove Button */}
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        ${(item.product_price * item.quantity).toFixed(2)}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-full shadow-sm hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 dark:text-gray-200 transition-all"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Remove
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-lg text-gray-500 dark:text-gray-400"
            >
              Your cart is empty
            </motion.p>
          )}
        </div>

        {/* Cart Summary */}
        <div className="p-6 bg-white dark:bg-gray-700 rounded-lg h-fit shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Cart Summary
          </h2>
          <div className="text-gray-600 dark:text-gray-400 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${calculateTotalTax().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-800 dark:text-gray-200 mt-4">
              <span>Total:</span>
              <span>
                ${(calculateTotal() + calculateTotalTax()).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-3 bg-black text-white font-medium rounded-lg shadow-md hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors"
            >
              Checkout
            </motion.button>
            <button className="w-full transition-colors px-8 py-3 mt-4 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
