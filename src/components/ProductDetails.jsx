import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../ui/Spinner';

export const ProductDetails = () => {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductDetails = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://127.0.0.1:8000/products/api/product/${id}`
      );
      setProductDetails(data);
    } catch (error) {
      setError("Failed to fetch product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductDetails(id);
  }, [id]);
  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  if (loading) {
    return (
      <div className="flex items-center w-full justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center w-full justify-center">
        {error}
      </div>
    );
  }
  return (
    <div className="flex flex-col md:flex-row p-8 gap-8">
      <div className="w-full md:w-1/2">
        <img
          className="w-full max-h-96 object-contain"
          src={productDetails?.image}
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">{productDetails?.name}</h1>
        <p className="text-xl font-semibold text-gray-700">
          ${productDetails?.price}{" "}
        </p>
        <div className="flex items-center text-yellow-400 text-lg">
          {"★".repeat(productDetails?.avr_review)}
          {"☆".repeat(5 - productDetails?.avr_review)}{" "}
          <span className="ml-2 text-gray-600">
            ({productDetails?.count_review} Reviews){" "}
          </span>{" "}
        </div>
        {/* Product Description */}
        <p className="text-gray-700">{productDetails?.description}</p>
        {/* Quantity Selector */}
        <div className="flex items-center space-x-2">
          <span className="font-medium">Quantity:</span>
          <button
            onClick={() => handleQuantityChange(-1)}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
          >
            +
          </button>
        </div>
        {/* Category Display */}{" "}
        <div className="flex items-center space-x-2">
          <span className="font-medium">Category:</span>{" "}
          <span className="bg-gray-200 px-2 py-1 rounded text-sm">
            {productDetails?.category?.category?.name} /{" "}
            {productDetails?.category?.name}{" "}
          </span>{" "}
        </div>
        {/* Add to Cart Button */}{" "}
        <button className="mt-4 py-2 px-4 bg-black text-white rounded hover:bg-gray-800">
          ADD TO CART{" "}
        </button>
      </div>
    </div>
  );
}
