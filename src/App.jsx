import { useState } from 'react'
import reactLogo from './assets/react.svg'
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
import { ProfileContextProvider } from './context/ProfileContext'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ProductDetails } from './components/ProductDetails'
import Categories from './components/Categories'
import Brands from './components/Brands'
import CategoryDetails from './components/CategoryDetails'
import BrandDetails from './components/BrandDetails'


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
        path: "categories",
        element: <Categories />,
      },
      {
        path:"/categories/:category?/:subcategory?",
        element: <CategoryDetails />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "brands/:brand",
        element: <BrandDetails />,
      },
      {
        path: "products/:id/:category",
        element: <ProductDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <ProfileContextProvider>
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
            </ProfileContextProvider>
          </UserContextProvider>
        </QueryClientProvider>
    </>
  );
}

export default App
