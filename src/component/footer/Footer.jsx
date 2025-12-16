import React from "react";
import {
  FaFacebookF,

  FaLinkedinIn,
  FaInstagram,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import logoImg from "../../assets/logo.jpeg";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="w-10/12 mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <Link to='/' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
            <img src={logoImg} alt="" className="w-16 rounded-full border-2 border-orange-500" />
            <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
              LoanLink
            </h3>
          </Link>

          <p className="text-gray-400 mt-2">
            LoanLink is a secure, fast, and transparent microloan platform,
            helping individuals access financial support effortlessly. Join
            thousands who trust us for their financial needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-orange-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-loans" className="text-gray-400 hover:text-orange-400 transition-colors">
                Available Loans
              </Link>
            </li>
            <li>
              <Link
                to="/loan-application"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Apply Now
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-gray-400 hover:text-orange-400 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: support@loanlink.com</li>
            <li>Phone: +880 17********</li>
            <li>Address: Bogura, Bangladesh</li>
          </ul>


          <div className="flex mt-4 space-x-4">
            <a href="https://x.com" className="hover:scale-110 bg-white w-8 h-8 rounded-full flex items-center justify-center transition">
              <img src="https://i.ibb.co.com/WC1HVbx/download.png" alt="" className="w-5" />
            </a>

            <a href="https://www.facebook.com" className="hover:scale-110 text-white hover:text-blue-500 transition-colors">
              <FaFacebookSquare size={30} />
            </a>
            <a href="https://www.instagram.com" className="hover:scale-110 text-white hover:text-pink-500 transition-colors">
              <FaInstagramSquare size={30} />
            </a>

            <a href="https://www.linkedin.com" className="hover:scale-110 text-white hover:text-blue-700 transition-colors">
              {" "}
              <FaLinkedin size={30} />
            </a>

          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Subscribe</h3>
          <p className="text-gray-400 mb-4">
            Get the latest updates and offers directly in your inbox.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="btn-brand px-4 py-2 rounded-md font-semibold hover:shadow-orange-500/20"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} LoanLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
