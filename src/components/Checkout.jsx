import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import Spinner from "../ui/Spinner";
import axios from "axios";
import { data } from "autoprefixer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const navigate = useNavigate();
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state
  const [placeOrderBtnLoading, setPlaceOrderBtnLoading] = useState(false); // New loading state
  const { displayCart } = useContext(CartContext);
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    country: "",
    orderNote: "",
    paymentMethod: "",
  });
  const [orderPayment, setOrderPayment] = useState(null);

  async function getCart() {
    setLoading(true); // Set loading to true before fetching data
    let response = await displayCart();
    if (response && response.results) {
      setCartDetails(response.results || []);
    }
    setLoading(false); // Set loading to false after data is fetched
  }
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

  useEffect(() => {
    getCart();
  }, []);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
  };

  const handleCashPayment = async () => {
      try {
        // Define your endpoint here

          if (!headers) {
            console.error("No authentication token found");            
            return; // Exit the function if token is missing
          }
          

        // Send request to cash payment endpoint
        const response = await axios.post(
          "http://127.0.0.1:8000/order/cash-order_api/",
          {},
          {
            headers
          }
        );

        // Handle the response as needed
        toast.success(response?.data?.message);        
        navigate("/order-success", {
          state: {
            orderDetails: response?.data,
          },
        });
      } catch (error) {
        // Handle error if the request fails
        setPlaceOrderBtnLoading(false);
        toast.error("Error processing cash payment:", error);
      }
  };  


  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Place order function
  const handlePlaceOrder = async () => {
   
    const orderData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address_line_1: formData.addressLine1,
      address_line_2: formData.addressLine2,
      state: formData.state,
      city: formData.city,
      country: formData.country,
      order_note: formData.orderNote,
      payment_method: formData.paymentMethod,
    };

    try {
       setPlaceOrderBtnLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/order/place_order_api/",
        orderData,
        {
          headers
        }
      );
      setOrderPayment(response?.data?.order?.payment_method);

      toast.loading("redirct to success page");
      setTimeout(() => {
        if (response?.data?.order?.payment_method == "cash") {
          handleCashPayment();
          setPlaceOrderBtnLoading(false);
        } else {
          console.log("failed");
        }
      }, 4000);
      
    } catch (error) {
       setPlaceOrderBtnLoading(false);
      console.error("Error placing order:", error);
    }finally{
       setPlaceOrderBtnLoading(true);
    }
  };

  
  

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
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="col-span-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              type="text"
              placeholder="Last Name"
              className="col-span-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              className="col-span-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              type="tel"
              placeholder="Phone Number"
              className="col-span-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              type="text"
              placeholder="Address Line 1"
              className="col-span-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              type="text"
              placeholder="Address Line 2"
              className="col-span-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              type="text"
              placeholder="State"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              type="text"
              placeholder="City"
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <input
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              type="text"
              placeholder="Country"
              className="col-span-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            <textarea
              name="orderNote"
              value={formData.orderNote}
              onChange={handleInputChange}
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
            {loading ? (
              <Spinner /> // Display a loading message or spinner while loading
            ) : (
              cartDetails.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <img
                    src={item.product_image} // Adjust this to match the actual image field in your data
                    alt={item.product_name} // Adjust this to match the actual name field in your data
                    className="w-16 h-16 rounded-md border dark:border-gray-600"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      {item.product_name} {/* Replace with actual field name */}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.quantity} x ${item.product_price}{" "}
                      {/* Replace with actual fields */}
                    </p>
                  </div>
                  <button className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition">
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="border-t dark:border-gray-700 pt-4 mt-4 text-gray-700 dark:text-gray-300 space-y-2">
            <p className="flex justify-between">
              <span>Subtotal:</span> <span>${calculateTotal().toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax:</span> <span>${calculateTotalTax().toFixed(2)}</span>
            </p>
            <p className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>{" "}
              <span>
                ${(calculateTotal() + calculateTotalTax()).toFixed(2)}
              </span>
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
              name="paymentMethod"
              value="paypal"
              onChange={handleInputChange}
              className="mr-3 focus:ring-blue-600"
            />
            <span className="font-medium">PayPal</span>
          </label>
          <label className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              onChange={handleInputChange}
              className="mr-3 focus:ring-blue-600"
            />
            <span className="font-medium">Stripe</span>
          </label>
          <label className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              onChange={handleInputChange}
              className="mr-3 focus:ring-blue-600"
            />
            <span className="font-medium">Cash on Delivery</span>
          </label>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={placeOrderBtnLoading}
          className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 transition text-white font-semibold w-full py-4 mt-8 flex justify-center items-center rounded-md"
        >
          {placeOrderBtnLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
              Place Order...
            </>
          ) : (
            "Place Order"
          )}
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          Secure Payment: All transactions are encrypted and protected.
        </p>
      </motion.div>
    </div>
  );
};

export default Checkout;
