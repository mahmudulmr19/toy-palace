import React from "react";
import Container from "../global/Container";
import p1 from "../../assets/popular/1.png";
import p2 from "../../assets/popular/2.png";
import p3 from "../../assets/popular/3.png";
import p4 from "../../assets/popular/4.png";
const Popular = () => {
  return (
    <section className="py-10">
      <Container className="flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-12">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-teal-600/90 rounded p-7">
            <img src={p2} alt="popular product" className="w-full h-full" />
          </div>
          <div className="bg-blue-600/90 rounded p-7">
            <img src={p1} alt="popular product" className="w-full h-full" />
          </div>
          <div className="bg-indigo-600/90 rounded p-7">
            <img src={p3} alt="popular product" className="w-full h-full" />
          </div>
          <div className="bg-green-600/90 rounded p-7">
            <img src={p4} alt="popular product" className="w-full h-full" />
          </div>
        </div>
        <div className="w-full space-y-5">
          <h1 className="font-bold capitalize text-gray-900 text-2xl md:text-3xl lg:text-4xl">
            Our Best and Popular Selling Toys
          </h1>
          <div className="flex items-center gap-x-12">
            <h4 className="font-bold text-3xl text-gray-800">
              5.4m
              <span className="text-sm block text-gray-800">Toys Sell</span>
            </h4>

            <h4 className="font-bold text-3xl text-gray-800">
              1m
              <span className="text-sm block text-gray-800">Active Users</span>
            </h4>
          </div>

          <button className="rounded px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white transition-all">
            Show More
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Popular;
