import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { motion } from "framer-motion";
import { Rating } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import the heart icons
import { UserContext } from "../context/UserContext";
import { wishlistContext } from "../context/AddToFavoriteContext";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import Modal from "../shared/Modal";
import {
  Listbox,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const BrandDetails = () => {
  const navigate = useNavigate();
  const { brand } = useParams();
  let { setUserLogin, userLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [error, setError] = useState("");
  const { toggleFavorite, wishlistProducts } = useContext(wishlistContext);

  let { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("userTaken")}`,
  };

  const openModal = (product) => {
    setSelectedProduct(product); // Set the clicked product
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const getRelatedProducts = async () => {
    setLoading(true);
    try {
      // Build the URL dynamically based on category and subcategory presence
      let url = `${import.meta.env.VITE_BASE_URL}/products/api/products?`;

      if (brand) {
        url += `brand=${brand}`;
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

  const handleAddToCart = (product) => {
    if (!userLogin) {
      return toast.error("You Must Login Fisrt!");
    }
    if (!product) return; // Ensure product is not null

    setLoadingBtn(true); // Set loading to true when request starts

    if (!selectedSize && !selectedColor) {
      // If no size or color is selected, handle accordingly
      addToCart(product.id, null, null, quantity)
        .then(() => {
          toast.success("Item added to cart successfully!");
        })
        .catch((error) => {
          toast.error("Error adding item to cart:", error);
        })
        .finally(() => {
          setLoadingBtn(false); // Set loading to false when done
        });
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color options.");
      setLoadingBtn(false); // Stop loading if options are incomplete
      return;
    }

    // If both size and color are selected
    addToCart(
      product.id,
      selectedSize.variation_value,
      selectedColor.variation_value,
      quantity
    )
      .then(() => {
        toast.success("Item added to cart successfully!");
      })
      .catch((error) => {
        toast.error("Error adding item to cart:", error);
      })
      .finally(() => {
        setLoadingBtn(false); // Set loading to false when done
      });
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

 const handleToggle = (productId) => {
   if (!userLogin) {
     return toast.error("You Must Login First!");
   }
   // Toggle the favorite status
   toggleFavorite(productId); // Ensure this is updating the wishlist context properly
 };

  useEffect(() => {
    getRelatedProducts();
  }, [brand]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <>
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
                      <Link
                        to={`/products/${product.id}/${product.category.id}`}
                      >
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
                        onClick={() => openModal(product)}
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
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400 text-lg">
              No results found. Try adjusting your search or filters.
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          selectedProduct?.color_variations?.length > 0 ||
          selectedProduct?.size_variations?.length > 0
            ? "Choose Variations & Quantity"
            : "Choose Quantity"
        }
        onSubmit={() => {
          handleAddToCart(selectedProduct); // Pass selected product to handleAddToCart
          closeModal();
        }}
        disabled={loadingBtn}
      >
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Quantity:
          </span>
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-8 h-8 text-xl font-bold bg-gray-200 hover:bg-gray-300 rounded-full shadow dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 transition-all duration-150 ease-in-out flex items-center justify-center"
          >
            -
          </button>
          <span className="px-4 py-1 text-lg font-semibold bg-gray-100 rounded-md dark:bg-gray-600 dark:text-gray-200">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-8 h-8 text-xl font-bold bg-gray-200 hover:bg-gray-300 rounded-full shadow dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-300 transition-all duration-150 ease-in-out flex items-center justify-center"
          >
            +
          </button>
        </div>
        {(selectedProduct?.color_variations?.length > 0 ||
          selectedProduct?.size_variations?.length > 0) && (
          <>
            <div className="flex space-x-20 mt-4">
              {/* Color Selection */}
              {selectedProduct.color_variations?.length > 0 && (
                <div className="w-1/3">
                  <span className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Color:
                  </span>
                  <Listbox value={selectedColor} onChange={setSelectedColor}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200">
                        <span className="block truncate">
                          {selectedColor?.variation_value || "Select a color"}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <ChevronDownIcon
                            className="w-5 h-5 text-gray-400 dark:text-gray-500"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Listbox.Options className="absolute w-full py-1 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                        {selectedProduct.color_variations.map((variation) => (
                          <Listbox.Option
                            key={variation.id}
                            value={variation}
                            className={({ active }) =>
                              `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-gradient-to-r from-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                  : "text-gray-700 dark:text-gray-200"
                              } transition duration-200 ease-in-out rounded-md`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {variation.variation_value}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
              )}

              {/* Size Selection */}
              {selectedProduct.size_variations?.length > 0 && (
                <div className="w-1/3">
                  <span className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Size:
                  </span>
                  <Listbox value={selectedSize} onChange={setSelectedSize}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200">
                        <span className="block truncate">
                          {selectedSize?.variation_value || "Select a size"}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <ChevronDownIcon
                            className="w-5 h-5 text-gray-400 dark:text-gray-500"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Listbox.Options className="absolute w-full py-1 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                        {selectedProduct.size_variations.map((size) => (
                          <Listbox.Option
                            key={size.id}
                            value={size}
                            className={({ active }) =>
                              `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-gradient-to-r from-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                  : "text-gray-700 dark:text-gray-200"
                              } transition duration-200 ease-in-out rounded-md`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {size.variation_value}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default BrandDetails;
