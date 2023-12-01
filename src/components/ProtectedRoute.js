import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, ...props }) => {
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace={true} state={{ from: props.location }} />
  );
};

export default ProtectedRoute;
