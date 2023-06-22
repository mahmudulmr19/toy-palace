import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Loader from "../components/global/Loader";

const LoadingRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Loader />;
  }
  return children;
};

export default LoadingRoute;
