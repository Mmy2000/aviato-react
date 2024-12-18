import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Products } from "./components/Products";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import UserContextProvider from "./context/UserContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductDetails } from "./components/ProductDetails";
import Categories from "./components/Categories";
import Brands from "./components/Brands";
import CategoryDetails from "./components/CategoryDetails";
import BrandDetails from "./components/BrandDetails";
import CartContextProvider from "./context/CartContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import WishlistContextProvider from "./context/AddToFavoriteContext";
import Favorite from "./components/Favorite";
import Orders from "./components/Orders";
import OrderDetails from "./components/OrderDetails";
import ChangePassword from "./components/ChangePassword";
import ResetPassword from "./components/ResetPassword";
import Home from "./components/Home";
import Contact from "./components/Contact";
import ExecutePayment from "./components/ExecutePayment";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Notfound from "./components/Notfound";
import Dashboard from "./components/Dashboard";



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
        index: true,
        path: "categories",
        element: <Categories />,
      },
      {
        path: "/categories/:category?/:subcategory?",
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
        path: "products/:id/:category/:brand?",
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
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <ProtectedRoute>
            <Favorite />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "order-success",
        element: (
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/change-password",
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "orders/:id",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "order/execute-payment",
        element: (
          <ProtectedRoute>
            <ExecutePayment />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

const queryClient = new QueryClient();
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WishlistContextProvider>
          <CartContextProvider>
            <UserContextProvider>
              <ProfileContextProvider>
                <RouterProvider router={router}></RouterProvider>
                <Toaster
                  toastOptions={{
                    duration: 4000,
                    style: {
                      padding: "12px 16px",
                      color: "#2D3748", // Neutral text color
                      backgroundColor: "#FFFFFF", // Clean white background
                      borderRadius: "8px", // Smooth corners
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Subtle shadow
                      fontSize: "14px", // Consistent font size
                      fontWeight: "500", // Slightly bold for better readability
                    },
                    success: {
                      icon: "✅",
                      style: {
                        color: "#2F855A", // Green for success
                      },
                    },
                    error: {
                      icon: "❌",
                      style: {
                        color: "#E53E3E", // Updated to a more accessible red
                      },
                    },
                  }}
                />
              </ProfileContextProvider>
            </UserContextProvider>
          </CartContextProvider>
        </WishlistContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
