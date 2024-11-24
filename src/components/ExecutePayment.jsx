import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";

const ExecutePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { displayCart, setcartInfo } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const executed = useRef(false); // Move useRef to the component's top-level

  const parseQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      paymentId: params.get("paymentId"),
      token: params.get("token"),
      payerId: params.get("PayerID"),
    };
  };

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
  };

  const getCart = async () => {
    setLoading(true);
    let response = await displayCart();
    if (response && response.results) {
      setCartDetails(response.results || []);
      setcartInfo(response || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    const executePayment = async () => {
      if (executed.current) return; // Prevent re-execution
      executed.current = true;

      const queryParams = parseQueryParams();

      if (!queryParams.paymentId || !queryParams.payerId) {
        setError("Missing required query parameters.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/order/execute-paypal-payment/",
          {
            payment_id: queryParams.paymentId,
            payer_id: queryParams.payerId,
          },
          { headers }
        );

        toast.success("Payment executed successfully");
        await getCart();
        navigate("/order-success", {
          state: { orderDetails: response.data },
        });
      } catch (error) {
        console.error(
          "Error executing payment:",
          error.response?.data || error.message
        );
        setError(
          error.response?.data?.error ||
            "Failed to execute payment. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    executePayment();
  }, [location.search, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 border-4 border-t-transparent border-green-600 rounded-full animate-spin"
              role="status"
            ></div>
          </div>
          <svg
            className="w-12 h-12 text-green-600 dark:text-green-400 animate-pulse"
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
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-200">
          Redirecting to Success Page...
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Please wait while we process your payment.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Payment Failed</h1>
        <p>{error}</p>
      </div>
    );
  }

  return <></>;
};

export default ExecutePayment;
