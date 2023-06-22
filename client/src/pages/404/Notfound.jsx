import React from "react";
import { Helmet } from "react-helmet-async";
import { HiFaceFrown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Helmet>
        <title>404: This page could not be found - Toy Palace</title>
      </Helmet>
      <HiFaceFrown className="h-52 w-52 text-indigo-500" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-indigo-500 text-white rounded px-4 py-2 hover:bg-indigo-600"
      >
        Go Back to Homepage
      </button>
    </div>
  );
};

export default Notfound;
