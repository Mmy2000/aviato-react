
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { motion } from "framer-motion";
import { Rating } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import the heart icons
import { UserContext } from "../context/UserContext";
import { wishlistContext } from "../context/AddToFavoriteContext";


const CategoryDetails = () => {
  let { setUserLogin, userLogin } = useContext(UserContext);
  const { toggleFavorite, wishlistProducts } = useContext(wishlistContext);
  const { category,subcategory } = useParams();
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [error, setError] = useState("");
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
  };

  const getRelatedProducts = async () => {
    setLoading(true);
    try {
      // Build the URL dynamically based on category and subcategory presence
      let url = "http://127.0.0.1:8000/products/api/products?";

      if (category) {
        url += `category=${category}`;
      }
      if (subcategory) {
        url += `&subcategory=${subcategory}`;
      }
      if (userLogin) {
        const { data } = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: headers.Authorization,
          },
        });
        setRelatedProducts(data?.data);
      }else{
        const { data } = await axios.get(url);
        setRelatedProducts(data?.data);
      }
      
    } catch (error) {
      setError("Failed to fetch product details. Please try again later.");
      console.error("Error fetching related products:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleToggle = (productId) => {
    const isFavoriteProduct = wishlistProducts.some(
      (product) => product.id === productId
    );

    // Toggle the favorite status
    toggleFavorite(productId); // Ensure this is updating the wishlist context properly
  };
  

  useEffect(() => {
    getRelatedProducts();
  }, [category]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className=" space-y-4 p-6">
        {relatedProducts && relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((product) => {
              const price = parseFloat(product.price);
              return (
                <motion.div
                  key={product.id}
                  className="bg-white max-h-fit main-card dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    <motion.img
                      src={product.image || "/placeholder-image.jpg"}
                      alt={product.name}
                      className="w-full h-56 object-contain"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-gray-600 to-gray-400 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg">
                      {isNaN(price) ? "N/A" : `$${price.toFixed(2)}`}
                    </div>
                    <div
                      onClick={() => handleToggle(product.id)} // This will now toggle the favorite state
                      className="absolute wish-badge opacity-0 right-3 cursor-pointer border-slate-700 text-gray-800 dark:text-gray-200 dark:border-slate-200 text-sm font-semibold px-2 py-2 rounded-full shadow-lg"
                    >
                      {wishlistProducts.some(
                        (item) => item.id === product.id
                      ) ? (
                        <motion.div
                          key="filled-heart"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          }}
                        >
                          <FaHeart size={24} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty-heart"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          }}
                        >
                          <FaRegHeart size={24} />
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <Link to={`/products/${product.id}/${product.category.id}`}>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                      {product.description || "No description available."}
                    </p>
                    <div className="flex items-center mt-3">
                      <Rating
                        value={product.avr_review}
                        readOnly
                        precision={0.5}
                        sx={{ color: "slategray" }}
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        ({product.count_review} reviews)
                      </span>
                    </div>
                    <motion.button
                      className="mt-5 w-full flex items-center justify-center bg-gray-600 text-white py-2 rounded-full hover:bg-slate-700 focus:outline-none transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaShoppingCart className="mr-2" />
                      Quick Add
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-200 text-lg space-y-4">
            <p className="text-xl font-bold">
              Oops, we couldn’t find any matches.
            </p>
            <p className="text-gray-600 dark:text-gray-200 font-medium text-center">
              Try adjusting your filters, or explore our other categories to
              find something you’ll love!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
