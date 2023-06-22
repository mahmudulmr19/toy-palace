import React, { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { AuthContext } from "../../context/AuthProvider";
import { Helmet } from "react-helmet-async";
import { HiPencil, HiChevronDown } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Rating } from "@smastrom/react-rating";
import { useScrollTop } from "../../hooks";
import Container from "../../components/global/Container";

const MyToys = () => {
  useScrollTop();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    fetch(`https://toy-palace.vercel.app/api/toy?email=${currentUser?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
        setLoading(false);
      });
  }, []);

  const handleToyDelete = (id) => {
    fetch(`https://toy-palace.vercel.app/api/toys/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        const result = toys.filter((toy) => toy._id !== id);
        setToys(result);
        toast.success("Toy deleted successfully!");
      }
      if (!res.ok) {
        toast.error("Something went wrong");
      }
    });
  };

  const handleSort = (sortName) => {
    setLoading(true);
    if (sortName === "any") {
      return fetch(
        `https://toy-palace.vercel.app/api/toy?email=${currentUser?.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setToys(data);
          setLoading(false);
        });
    }

    fetch(
      `https://toy-palace.vercel.app/api/sort/${sortName}?email=${currentUser.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
        setLoading(false);
      });
  };

  return (
    <Container className="my-16">
      <Helmet>
        <title>My Toys - Toy Palace</title>
      </Helmet>
      <h1 className="font-bold text-gray-900 text-2xl lg:text-3xl text-center">
        My Toys
      </h1>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-14">
        <div className="text-right mr-4 my-3">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort By Price
                <HiChevronDown
                  className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    <button
                      onClick={(e) => handleSort("any")}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                    >
                      Any
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={(e) => handleSort("ascending")}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                    >
                      Ascending
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={(e) => handleSort("descending")}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                    >
                      Descending
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
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
                Rating
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Seller Info
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
                <h1 className="text-gray-900">No toys have been added yet!</h1>
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
                          className="h-10"
                        />
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
                        <h2 className="text-center">{toy.rating}</h2>
                        <Rating
                          readOnly
                          value={toy.rating}
                          style={{ maxWidth: 100 }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[12px] text-gray-900 flex flex-col">
                        <span>{toy.sellerName}</span>
                        <span>{toy.sellerEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/my-toys/${toy._id}`)}
                          className="bg-indigo-500 hover:bg-indigo-600 transition-all px-2 py-2 text-white rounded inline-flex items-center justify-center"
                        >
                          <HiPencil />
                        </button>
                        <button
                          onClick={() => setIsOpen(true)}
                          className="bg-red-500 hover:bg-red-600 transition-all px-2 py-2 text-white rounded inline-flex items-center justify-center"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                    {/* modal */}
                    <Transition appear show={isOpen} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-50"
                        onClose={() => setIsOpen(false)}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                          <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                            >
                              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <h3 className="text-lg font-medium mb-4">
                                  Delete Confirmation
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">
                                  Are you sure you want to delete this toy? This
                                  action cannot be undone.
                                </p>
                                <div className="flex justify-end">
                                  <button
                                    className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md mr-2"
                                    onClick={() => {
                                      handleToyDelete(toy._id);
                                      setIsOpen(false);
                                    }}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all px-4 py-2 rounded-md"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default MyToys;
