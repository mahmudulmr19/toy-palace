import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div
        className={`w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
