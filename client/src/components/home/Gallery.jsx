import React from "react";
import Container from "../global/Container";
import { galleryImages } from "../../constants";

const Gallery = () => {
  return (
    <Container className="py-10 my-5">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
        Gallery
      </h1>
      <p className="text-lg text-gray-700 text-center mt-4">
        Browse through our collection of captivating toy photos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {galleryImages.map((item, index) => (
          <div
            key={index}
            className="p-7 border border-gray-300 rounded flex items-center justify-center cursor-pointer"
          >
            <img
              src={item.image}
              alt="Gallery image"
              className="w-full h-auto hover:scale-110 duration-300"
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Gallery;
