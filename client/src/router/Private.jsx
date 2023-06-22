import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router";
import { toast } from "react-hot-toast";

const Private = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  if (currentUser) {
    return children;
  }

  toast.error("You have to log in first to view details");
  return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default Private;
