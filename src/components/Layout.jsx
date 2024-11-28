import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Navbar />
      <div className=" mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
