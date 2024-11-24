import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineCheckCircle,
  HiOutlineUser,
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
} from "react-icons/hi";
import Confetti from "react-dom-confetti";
import { useEffect, useState } from "react";


const OrderSuccess = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};
  const [showConfetti, setShowConfetti] = useState(false);
   useEffect(() => {
     setShowConfetti(true);
   }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="relative text-gray-900 dark:text-gray-200 p-8 mb-12">
          <HiOutlineCheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-center">
            {orderDetails?.message || "Order Placed Successfully!"}
          </h1>
          <p className="text-center mt-2 opacity-90">
            Thank you for your purchase! Below are the details of your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Details */}
          <div className="bg-white dark:bg-gray-900 shadow-lg border rounded-lg p-8">
            <h2 className="flex items-center text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              <HiOutlineUser className="w-6 h-6 text-blue-600 mr-2" /> Order
              Details
            </h2>

            <div className="space-y-4">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>Payment Method:</strong>{" "}
                {orderDetails?.order.payment_method}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>Order Note:</strong>{" "}
                {orderDetails?.order.order_note || "No notes provided"}
              </p>

              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-6">
                Customer Information
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>Name:</strong> {orderDetails?.order.first_name}{" "}
                {orderDetails?.order.last_name}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>Email:</strong> {orderDetails?.order.email}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>Phone:</strong> {orderDetails?.order.phone}
              </p>

              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-6">
                Shipping Address
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {orderDetails?.order.address_line_1},{" "}
                {orderDetails?.order.address_line_2}, {orderDetails?.order.city}
                , {orderDetails?.order.state}, {orderDetails?.order.country}
              </p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white dark:bg-gray-900 shadow-lg border rounded-lg p-8">
            <h2 className="flex items-center text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              <HiOutlineCreditCard className="w-6 h-6 text-blue-600 mr-2" />{" "}
              Payment Details
            </h2>

            <div className="space-y-4">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>Payment ID:</strong> {orderDetails?.payment.payment_id}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>Payment Method:</strong>{" "}
                {orderDetails?.payment.payment_method}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center">
                <strong>Status:</strong>{" "}
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-sm ${
                    orderDetails?.payment.status === "Completed"
                      ? "text-green-700 bg-green-100 dark:text-slate-600 dark:bg-green-200 "
                      : "text-blue-800 bg-blue-100 dark:text-gray-100 dark:bg-blue-900"
                  }`}
                >
                  {orderDetails?.payment.status}
                </span>
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>Paid:</strong>{" "}
                {orderDetails?.payment.payment_paid === "False" ? "No" : "Yes"}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>Created At:</strong>{" "}
                {new Date(orderDetails?.payment.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <Link to={"/"}>
            <button className="bg-gray-600 text-white px-10 py-3 rounded-full shadow-lg hover:bg-gray-700 hover:shadow-xl transform transition-all hover:scale-105">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
