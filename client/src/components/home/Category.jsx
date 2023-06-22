import React, { useEffect, useState } from "react";
import Container from "../global/Container";
import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";

const Category = () => {
  const [data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Sports Car");

  useEffect(() => {
    fetch(
      `https://toy-palace.vercel.app/api/category/toys?categoryName=${activeCategory}`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [activeCategory]);

  const categories = ["Sports Car", "Monster Truck", "Truck"];

  return (
    <Container className="my-10 py-5">
      <div className="flex justify-center mb-20">
        <Tab.Group>
          <Tab.List className="flex space-x-4">
            {categories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `px-4 py-2 font-medium rounded-lg text-lg outline-none transition-all ${
                    selected
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-900 hover:bg-indigo-500 hover:text-white"
                  }`
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((toy) => (
          <div
            key={toy._id}
            className="bg-white border shadow rounded-lg overflow-hidden p-5"
          >
            <img
              src={toy.toyImage}
              alt={toy.toyName}
              className="w-full h-56 object-cover"
            />
            <div className="mt-3">
              <h3 className="text-xl font-semibold mb-2">{toy.toyName}</h3>
              <p className="text-gray-800">Price: ${toy.price}</p>
              <p className="text-gray-600 flex items-center gap-1">
                Rating:{" "}
                <Rating
                  readOnly
                  value={data.rating}
                  style={{ maxWidth: 100 }}
                />
              </p>
              <div className="mt-4">
                <Link
                  to={`/toy/${toy._id}`}
                  className="bg-indigo-500 text-white px-6 py-2 rounded-lg w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Category;
