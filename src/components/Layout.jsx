import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="px-20 mx-auto my-20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
