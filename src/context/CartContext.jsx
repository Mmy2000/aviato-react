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
      .get(`http://127.0.0.1:8000/cart/api/cart-items/`, {
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
        `http://127.0.0.1:8000/cart/api/cart-items/`,
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

  return (
    <CartContext.Provider value={{ displayCart, addToCart, cartInfo }}>
      {props.children}
    </CartContext.Provider>
  );
}
