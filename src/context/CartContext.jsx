import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartInfo, setcartInfo] = useState(null);

  let headers = {
    Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
  };

  function displayCart() {
    return axios
      .get(`${import.meta.env.VITE_BASE_URL}/cart/api/cart-items/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: headers.Authorization,
        },
      })
      .then((response) => {
        setcartInfo(response?.data);
        return response?.data;
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.detail === "No Cart matches the given query."
        ) {
          setcartInfo(null);
        }
        return error;
      });
  }

  function addToCart(productId, size, color, quantity) {
    return axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/cart/api/cart-items/`,
        {
          productId,
          size,
          color,
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: headers.Authorization,
          },
        }
      )
      .then((response) => {
        displayCart(); // Refresh cart info after adding item
        return response.data;
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        return error;
      });
  }

  function deleteCartItem(cartItemId) {
    return axios
      .delete(`${import.meta.env.VITE_BASE_URL}/cart/api/cart-items/${cartItemId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: headers.Authorization,
        },
      })
      .then((response) => {
        displayCart();
        // setcartInfo(response.data);
        return response;
      })
      .catch((error) => error);
  }

  function updateCartItem(cartItemId, quantity) {
    return axios
      .put(
        `${import.meta.env.VITE_BASE_URL}/cart/api/cart-items/${cartItemId}/`,
        {
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: headers.Authorization,
          },
        }
      )
      .then((response) => {
        displayCart();
        return response
      })
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{
        displayCart,
        addToCart,
        cartInfo,
        setcartInfo,
        deleteCartItem,
        updateCartItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
