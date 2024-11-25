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
          `${import.meta.env.VITE_BASE_URL}/order/execute-paypal-payment/`,
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
      <div className="flex flex-col items-center mb-10 justify-center">
        {/* Spinner */}
        <div
          className="w-16 h-16 border-4 border-t-transparent border-green-600 rounded-full animate-spin shadow-lg"
          role="status"
        ></div>

        {/* Text */}
        <div className="text-center mt-6">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 animate-pulse">
            Redirecting...
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Processing your payment. Hang tight!
          </p>
        </div>

        {/* Optional Progress Indicator */}
        <div className="mt-4 w-40 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 animate-loading-bar"></div>
        </div>
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
