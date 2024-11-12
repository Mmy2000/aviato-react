import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (localStorage.getItem("userTaken") != null) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
