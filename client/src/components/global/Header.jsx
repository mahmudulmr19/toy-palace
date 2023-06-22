import React, { Fragment, useContext } from "react";
import Container from "./Container";
import { Link, useNavigate } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../assets/global/logo.svg";
import { AuthContext } from "../../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container className="flex items-center justify-between py-4">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <img src={logo} className="h-12 w-12" alt="toy palace" />
          <h5 className="font-semibold text-xl">Toy Palace</h5>
        </div>

        <div className="hidden lg:flex items-center gap-12">
          <div className="flex items-center gap-8">
            <Link className="font-medium text-gray-700" to="/">
              Home
            </Link>
            <Link className="font-medium text-gray-700" to="/blog">
              Blog
            </Link>
            <Link className="font-medium text-gray-700" to="/all-toys">
              All Toys
            </Link>

            {currentUser && (
              <>
                <Link className="font-medium text-gray-700" to="/my-toys">
                  My Toys
                </Link>
                <Link className="font-medium text-gray-700" to="/add-a-toy">
                  Add A Toy
                </Link>
              </>
            )}
          </div>

          {currentUser ? (
            <div className="flex items-center gap-4">
              <div>
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer user-picture"
                />
                <Tooltip anchorSelect=".user-picture" place="top">
                  {currentUser.displayName}
                </Tooltip>
              </div>

              <button
                onClick={() => signOut(auth)}
                className="font-medium py-2.5 px-6 bg-indigo-500 hover:bg-indigo-600 transition-all text-white rounded"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="font-medium py-2.5 px-6 border border-indigo-500 rounded"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="font-medium py-2.5 px-6 bg-indigo-500 hover:bg-indigo-600 transition-all text-white rounded"
              >
                SignUp
              </button>
            </div>
          )}
        </div>

        {/* Mobile Device*/}
        <Popover className="relative lg:hidden">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? "" : "text-opacity-90"}
              group inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                {open ? <HiX /> : <HiMenu />}
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Popover.Panel className="absolute right-0 top-11 z-10 mt-3 w-screen max-w-[350px] overflow-hidden rounded bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {currentUser && (
                      <div className="mt-2 space-y-2">
                        <img
                          src={currentUser.photoURL}
                          alt={currentUser.displayName}
                          className="w-10 h-10 rounded-full object-cover cursor-pointer user-picture mx-auto"
                        />
                        <Tooltip anchorSelect=".user-picture" place="top">
                          {currentUser.displayName}
                        </Tooltip>
                        {/* latter on */}
                        {/* <button className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all py-2 text-white rounded">
                          View Profile
                        </button> */}
                      </div>
                    )}
                    <div className={`${currentUser && "mt-6"}`}>
                      <Link
                        to="/"
                        className="block w-full px-4 py-1.5 hover:bg-gray-200 rounded"
                      >
                        Home
                      </Link>
                      <Link
                        to="/blog"
                        className="block w-full px-4 py-1.5 hover:bg-gray-200 rounded"
                      >
                        Blog
                      </Link>
                      <Link
                        to="all-toys"
                        className="block w-full px-4 py-1.5 hover:bg-gray-200 rounded"
                      >
                        All Toys
                      </Link>

                      {currentUser && (
                        <>
                          <Link
                            className="block w-full px-4 py-1.5 hover:bg-gray-200 rounded"
                            to="/my-toys"
                          >
                            My Toys
                          </Link>
                          <Link
                            className="block w-full px-4 py-1.5 hover:bg-gray-200 rounded"
                            to="/add-a-toy"
                          >
                            Add A Toy
                          </Link>

                          <button
                            onClick={() => signOut(auth)}
                            className="mt-4 w-full border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all py-2 rounded"
                          >
                            Log out
                          </button>
                        </>
                      )}

                      {!currentUser && (
                        <button
                          onClick={() => navigate("/login")}
                          className="mt-4 w-full border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all py-2 rounded"
                        >
                          Log in
                        </button>
                      )}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </Container>
    </header>
  );
};

export default Header;
