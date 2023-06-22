import React from "react";
import Container from "../global/Container";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // letter on added send email functionality
  };
  return (
    <section className="py-10 mb-10">
      <Container>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Stay updated with the latest toy trends and exclusive offers.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row justify-center w-full mx-auto gap-4 lg:gap-2"
          >
            <div className="relative">
              <input
                type="text"
                id="email"
                className="block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ring-gray-300 focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Email
              </label>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
