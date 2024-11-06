import axios from 'axios';
import React, {Fragment, useEffect, useState } from 'react'
import Skeleton from "@mui/material/Skeleton";
import { Link } from 'react-router-dom';
import CurrencyFormat from './CurrencyFormat';
import { Rating } from '@mui/material';


const LatestProducts = () => {
    const [latestProducts, setLatestProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const getLatestProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://127.0.0.1:8000/products/api/recent-products/`
        );
    
        setLatestProducts(data);
      } catch (error) {
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
        getLatestProducts()
    
    }, []);
    console.log(latestProducts);
    
  return (
    <>
      <div className="flex flex-col gap-10 mt-4">
        {!loading ? (
          latestProducts &&
          latestProducts?.slice(0, 5).map((item, idx) => (
            <Fragment key={idx}>
              <div className="flex gap-8 items-center">
                <Link to={`/products/${item.id}/${item.category.id}`}>
                  <img
                    width="100"
                    height="100"
                    alt="product"
                    src={item.image}
                  />
                </Link>

                <div className="flex gap-1 flex-col">
                  <Link to={`/products/${item.id}/${item.category.id}`}>
                    <h1 className="text-sm dark:text-gray-200 font-semibold capitalize">
                      {item.name.substring(0, 35)}
                    </h1>
                  </Link>

                  <div className="flex justify-between gap-2 mt-4 text-gray-900 dark:text-gray-200">
                    <CurrencyFormat value={item.price} />
                  </div>

                  <div className="inline-flex items-center">
                    <Rating
                      className="mb-2"
                      name="read-only"
                      value={item.avr_review}
                      precision={0.5}
                      readOnly
                      sx={{ color: "slategray" }}
                    />
                    <span className="ms-4 text-gray-900 font-mono dark:text-gray-200 mb-2">
                      ({item.count_review})
                    </span>
                  </div>
                </div>
              </div>
            </Fragment>
          ))
        ) : (
          <div className="flex flex-col gap-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (item) => (
                <Skeleton key={item} className="h-4 w-full" />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default LatestProducts