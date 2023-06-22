import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useScrollTop } from "../../hooks";
import { AiOutlineSearch } from "react-icons/ai";
import Container from "../../components/global/Container";
const AllToys = () => {
  useScrollTop();
  const navigate = useNavigate();
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://toy-palace.vercel.app/api/toys?limit=${20}`)
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setLoading(true);
    if (!query) {
      return fetch("https://toy-palace.vercel.app/api/toys")
        .then((res) => res.json())
        .then((data) => {
          setToys(data);
          setLoading(false);
        });
    }

    fetch(`https://toy-palace.vercel.app/api/search/${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
        setLoading(false);
      });
  };

  const showAllToys = () => {
    fetch("https://toy-palace.vercel.app/api/toys")
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
        setLoading(false);
      });
  };

  const showLessToys = () => {
    fetch(`https://toy-palace.vercel.app/api/toys?limit=${20}`)
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
        setLoading(false);
      });
  };

  return (
    <Container className="my-16">
      <Helmet>
        <title>All Toys - Toy Palace</title>
      </Helmet>
      <h1 className="font-bold text-gray-900 text-2xl lg:text-3xl text-center">
        All Toys
      </h1>
      <div className="mt-14">
        <div className="flex items-center justify-between gap-5">
          <div className="relative flex-grow">
            <input
              onChange={handleSearch}
              type="text"
              id="search"
              className="block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ring-gray-300 focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer"
              placeholder=" "
            />
            <label
              htmlFor="search"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Search
            </label>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 text-xl py-3.5 rounded"
          >
            <AiOutlineSearch />
          </button>
        </div>
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Seller Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Toy Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sub-category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                AVAIL QTY
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <div className="px-6 py-4 whitespace-nowrap">
                <h1 className="text-gray-900">Loading...</h1>
              </div>
            ) : toys.length === 0 ? (
              <div className="px-6 py-4 whitespace-nowrap">
                <h1 className="text-gray-900">No data available!</h1>
              </div>
            ) : (
              <>
                {toys.map((toy, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <img
                          src={toy.toyImage}
                          alt={toy.toyName}
                          className="h-10 object-contain"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {toy.sellerName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{toy.toyName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {toy.subcategory}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${toy.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {toy.availableQuantity}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <button
                          onClick={() => navigate(`/toy/${toy._id}`)}
                          className="px-3 py-2 rounded border border-indigo-500"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {toys.length === 20 && (
        <div className="text-center mt-4">
          <button
            onClick={showAllToys}
            className="px-5 py-2.5 rounded bg-indigo-500 hover:bg-indigo-600 transition-all text-white"
          >
            Show All
          </button>
        </div>
      )}

      {toys.length > 20 && (
        <div className="text-center mt-4">
          <button
            onClick={showLessToys}
            className="px-5 py-2.5 rounded bg-indigo-500 hover:bg-indigo-600 transition-all text-white"
          >
            Show Less
          </button>
        </div>
      )}
    </Container>
  );
};

export default AllToys;
