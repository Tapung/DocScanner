import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AuthContext.jsx";

const ProtectedRoute = () => {
    const { isLoggedIn, isLoading } = useAppContext();

  
    if (isLoading) return <div>Loading...</div>;

  
    return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
