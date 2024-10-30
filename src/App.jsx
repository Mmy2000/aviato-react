import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/Home'
import { Layout } from './components/Layout'
import { Products } from './components/Products'
import Register from './components/Register'
import  { Toaster } from "react-hot-toast";
import Login from './components/Login'
import UserContextProvider from './context/UserContext'

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster
          toastOptions={{
            className: "",
            duration: 4000,
            style: {
              padding: "12px 16px",
              color: "#2d3748",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
            },
            success: {
              icon: "✅",
              style: {
                color: "#2f855a",
              },
            },
            error: {
              icon: "❌",
              style: {
                color: "#c53030",
              },
            },
            info: {
              icon: "ℹ️",
              style: {
                color: "#2b6cb0",
              },
            },
          }}
        />
      </UserContextProvider>
    </>
  );
}

export default App
