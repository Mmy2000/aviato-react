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
          Authorization: headers.Authorization, // Add the Authorization header here
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
          setcartInfo(null); // Set cartInfo to null or an empty object if no cart is found
        }
        return error;
      });
  }

  return (
    <CartContext.Provider value={{ displayCart, cartInfo }}>
      {props.children}
    </CartContext.Provider>
  );
}
