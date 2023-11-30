import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, ...props }) => {
  return (
    <Route {...props}>
      {isLoggedIn ? (
        children
      ) : (
        <Navigate to="/login" replace={true} state={{ from: props.location }} />
      )}
    </Route>
  );
};

export default ProtectedRoute;
