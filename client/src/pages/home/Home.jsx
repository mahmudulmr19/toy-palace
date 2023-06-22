import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Banner,
  Category,
  Gallery,
  Newsletter,
  Popular,
} from "../../components/home";
import { useScrollTop } from "../../hooks";

const Home = () => {
  useScrollTop();
  return (
    <div>
      <Helmet>
        <title>Toy Palace</title>
      </Helmet>
      <Banner />
      <Popular />
      <Gallery />
      <Category />
      <Newsletter />
    </div>
  );
};

export default Home;
