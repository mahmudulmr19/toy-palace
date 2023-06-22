import React from "react";
import Container from "./Container";
import logo from "../../assets/global/logo.svg";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-white border-t pt-6">
      <Container className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:justify-items-center gap-8">
        <Link to="/">
          <img src={logo} alt="toy palace" className="h-10 w-10" />
          <h1 className="font-bold text-xl">Toy Palace</h1>

          <p className="mt-2">
            ToyTrove: Discover, Explore, Play, and Share in our Enchanting Toy
            Marketplace!
          </p>
        </Link>

        <div>
          <h5 className="font-semibold to-gray-800">Contact Us</h5>

          <div className="flex flex-col gap-1 mt-3">
            <li className="list-none">Email: web@toypalace.web.app</li>
            <li className="list-none">Phone: +880 1602-051672</li>
            <li className="list-none">Address: kamal kasna, 5400, Rangpur</li>
          </div>
        </div>
        <div>
          <h5 className="font-semibold to-gray-800">Useful Links</h5>
          <div className="flex flex-col gap-1 mt-3">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <Link className="hover:underline" to="/blog">
              Blog
            </Link>
            <Link className="hover:underline" to="/all-toys">
              All Toys
            </Link>
          </div>
        </div>
        <div>
          <h5 className="font-semibold to-gray-800">Follow Us</h5>
          <div className="flex items-center gap-3 mt-3">
            <FaFacebook className="text-xl text-gray-900 cursor-pointer" />
            <FaInstagram className="text-xl text-gray-900 cursor-pointer" />
            <FaLinkedin className="text-xl text-gray-900 cursor-pointer" />
          </div>
        </div>
      </Container>

      <p className="text-center text-gray-900 mt-8 font-medium">
        &copy; {new Date().getFullYear()} Toy Palace. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
