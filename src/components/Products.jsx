import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../ui/Spinner';


export const Products = () => {

  function products() {
    return axios.get(`http://127.0.0.1:8000/products/api/products`);
  }
  let { isPending, isError, error, data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: products,
    // refetchInterval: 3000,
    // refetchIntervalInBackground: true,
    // staleTime:5000,
    // retry:10
  });
  console.log(data);
  if (isLoading) {
    return (
      <div className="flex items-center w-full justify-center">
        <Spinner/>
      </div>
    );
  }
  

  return <div>Products</div>;
}
