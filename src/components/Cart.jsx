import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Modal from "../shared/Modal";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [cartDetails, setCartDetails] = useState([]);
  const [isCloseloading, setIsCloseloading] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [currentId, setcurrentId] = useState("");
  const { displayCart, deleteCartItem, cartInfo, setcartInfo, updateCartItem } =
    useContext(CartContext);
  const [incrementLoading, setIncrementLoading] = useState(false);
  const [decrementLoading, setDecrementLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  async function getCart() {
    setLoading(true); // Set loading to true before fetching data
    let response = await displayCart();
    if (response && response.results) {
      setCartDetails(response.results || []);
      setcartInfo(response || []);
    }
    setLoading(false); // Set loading to false after data is fetched
  }
  async function deleteItem(cartItemId) {
    setIsCloseloading(true);
    setcurrentId(cartItemId);
    let response = await deleteCartItem(cartItemId);
    setCartDetails(response.data.cart_items);
    
    setcartInfo(response?.data.cart_items);
    toast.success("Cart Item deleted successfully");
    setIsCloseloading(false);
    setIsModalOpen(false)
  }

  const handleDeleteClick = (cartItemId) => {
    setcurrentId(cartItemId); // Set the current item to delete
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleModalSubmit = () => {
    if (currentId) deleteItem(currentId); // Proceed with deletion
  };

  async function updateCartQuantity(cartItemId, quantity, isIncrement) {
    if (quantity < 1) return;

    if (isIncrement) {
      setIncrementLoading(true);
    } else {
      setDecrementLoading(true);
    }

    try {
      let response = await updateCartItem(cartItemId, quantity);
      setCartDetails(response.data.cart_items);
      setcartInfo(response.data.cart_items);
      toast.success("Cart Item updated successfully");
    } catch (error) {
      toast.error("Failed to update item");
    } finally {
      setIncrementLoading(false);
      setDecrementLoading(false);
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
  if (loading) {
    return(
      <Spinner/>
    )
  }

  return (
    <>
      <Helmet>
        <title>Aviato | Cart</title>
      </Helmet>
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
                      className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-700 p-4 md:p-6 rounded-lg shadow-md space-y-4 md:space-y-0"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={itemVariants}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Product Image and Details */}
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-full md:w-24 h-24 object-cover rounded-lg"
                        />
                        <div>
                          <div className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300">
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
                      <div className="flex items-center gap-2 md:gap-4">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.id,
                              item.quantity - 1,
                              false
                            )
                          }
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-300"
                          disabled={decrementLoading || incrementLoading}
                        >
                          {decrementLoading ? (
                            <svg
                              className="w-4 h-4 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              ></path>
                            </svg>
                          ) : (
                            "-"
                          )}
                        </button>

                        <span className="text-gray-700 dark:text-gray-200">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1, true)
                          }
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-300"
                          disabled={incrementLoading || decrementLoading}
                        >
                          {incrementLoading ? (
                            <svg
                              className="w-4 h-4 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              ></path>
                            </svg>
                          ) : (
                            "+"
                          )}
                        </button>
                      </div>

                      {/* Total Price and Remove Button */}
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                        <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          ${(item.product_price * item.quantity).toFixed(2)}
                        </div>
                        <motion.button
                          onClick={() => handleDeleteClick(item.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-full shadow-sm hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 dark:text-gray-200 transition-all"
                          disabled={isCloseloading && currentId === item.id}
                        >
                          <>
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
                          </>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-center text-lg text-gray-500 dark:text-gray-400 py-10"
              >
                {/* Icon */}
                <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mb-6 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 4.5l.75 13.5c.075 1.337 1.134 2.437 2.625 2.437h10.5c1.491 0 2.55-1.1 2.625-2.437L20.25 4.5m-16.5 0h16.5m-16.5 0a2.25 2.25 0 012.25-2.25h11.25a2.25 2.25 0 012.25 2.25m-16.5 0l1.5 13.5m4.5-7.5h6m-6 3h4"
                    />
                  </svg>
                </div>

                {/* Message */}
                <p className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-4">
                  Your cart is empty!
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  Start shopping now to find products you’ll love and enjoy a
                  delightful shopping experience.
                </p>

                {/* Action Button */}
                <a
                  href="/products"
                  className="px-6 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-slate-700 transition duration-300"
                >
                  Browse Products
                </a>
              </motion.div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="p-6 bg-white mx-auto dark:bg-gray-700 rounded-lg h-fit shadow-md">
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
              <Link to={"/checkout"}>
                <motion.button
                  disabled={cartDetails.length == 0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-3 bg-black text-white font-medium rounded-lg shadow-md hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  Checkout
                </motion.button>
              </Link>
              <Link to={"/products"}>
                <button className="w-full transition-colors px-8 py-3 mt-4 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal without action
        title="Delete Cartitem"
        onSubmit={handleModalSubmit}
        loading={isCloseloading}
        okTxt="Delete"
        closeTxt="Cancel"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-1 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        }
      >
        Are you sure you want to delete this item from the cart?
      </Modal>
    </>
  );
};

export default Cart;
