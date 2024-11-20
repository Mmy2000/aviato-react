

import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";
import { Navigate, useNavigate } from "react-router-dom";

export let wishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [wishCount, setwishCount] = useState(null);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
  };


  function displayWishlist() {
    return axios
      .get(`${import.meta.env.VITE_BASE_URL}/accounts/api/favorites/`, {
        headers,
      })
      .then((response) => {
        setwishCount(response?.data?.length || 0);
        setWishlistProducts(response?.data || []);
        return response;
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        return error;
      });
  }

  function toggleFavorite(productId) {

    // Optimistically update the wishlist
    const isFavorite = wishlistProducts.some(
      (product) => product.id === productId
    );
    const updatedWishlist = isFavorite
      ? wishlistProducts.filter((product) => product.id !== productId)
      : [...wishlistProducts, { id: productId }];

    const updatedCount = updatedWishlist.length;
    setWishlistProducts(updatedWishlist);
    setwishCount(updatedCount);

    if (isFavorite) {
      toast.success("Removed from favorites!");
    } else {
      toast.success("Added to favorites!");
    }
    // Send the API request
    return axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/products/api/product/${productId}/favorite/`,
        {},
        { headers }
      )
      .then((response) => {
        // Sync state with the server response
        setwishCount(response?.data?.favorites_count || updatedCount);
        setWishlistProducts(response?.data?.favorites || updatedWishlist);
        return response;
      })
      .catch((error) => {
        console.error("Error toggling favorite:", error);
        // Revert optimistic update if there's an error
        setWishlistProducts(
          isFavorite
            ? [...updatedWishlist, { id: productId }]
            : updatedWishlist.filter((product) => product.id !== productId)
        );
        setwishCount(isFavorite ? updatedCount + 1 : updatedCount - 1);
        return error;
      });
  }

  return (
    <wishlistContext.Provider
      value={{
        displayWishlist,
        wishCount,
        toggleFavorite,
        wishlistProducts,
      }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
}
