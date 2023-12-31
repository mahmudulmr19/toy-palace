import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/global/Footer";
import Header from "../components/global/Header";

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
