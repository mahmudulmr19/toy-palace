import React, { useEffect } from "react";
import Container from "../global/Container";
import car from "../../assets/global/car.png";
import Aos from "aos";
const Banner = () => {
  useEffect(() => {
    Aos.init({
      duration: 1500,
      easing: "ease-in-out",
      delay: 200,
      offset: 100,
    });
  }, []);
  return (
    <Container className="py-8 my-4">
      <div className="flex flex-col lg:flex-row lg:items-center px-4 py-2 justify-between gap-5 overflow-hidden">
        <div className="space-y-4 w-full" data-aos="fade-right">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 capitalize">
            Find your best Toy Cars for your children
          </h1>
          <p className="lg:text-lg text-gray-900">
            We deliver best of fantastic,hand-piched,age appropriate toys books
            and puzzles,straight to your door
          </p>
          <button className="px-5 py-2.5 rounded bg-indigo-500 hover:bg-indigo-600 text-white transition-all">
            Get Started
          </button>
        </div>

        <div className="w-full" data-aos="fade-left">
          <img src={car} alt="banner car image" className="w-full h-full" />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
