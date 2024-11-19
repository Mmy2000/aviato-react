import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishlistContext = createContext();

export default function WishlistContextProvider(props) {
    const [wishCount, setwishCount] = useState(null);
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
    };

    function displayWishlist() {
      return axios
        .get(
          `http://127.0.0.1:8000/accounts/api/favorites/`,
          {
            headers,
          }
        )
        .then((response) => {
          setwishCount(response?.data?.length);
          return response;
        })
        .catch((error) => error);
    }
    

    return (
      <wishlistContext.Provider
        value={{
          displayWishlist,
          wishCount,
        }}
      >
        {props.children}
      </wishlistContext.Provider>
    );
}