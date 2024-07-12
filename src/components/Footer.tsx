import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGoogle,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <footer className="bg-emerald-900 text-white py-6">
        <div className="container mx-auto flex flex-col items-center">
          <div className="flex space-x-4 mb-4 font-bold">
            <a href="#" className="text-white hover:text-gray-400">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaDiscord size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaGoogle size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaYoutube size={24} />
            </a>
          </div>
          <div className="flex space-x-6 mb-4">
            <a
              href="#"
              className="hover:text-gray-400"
              onClick={() => navigate("/")}
            >
              Home
            </a>
            <a
              href="#"
              className="hover:text-gray-400"
              onClick={() => navigate("leaderboard")}
            >
              Leaderboard
            </a>
            <a
              href="#"
              className="hover:text-gray-400"
              onClick={() => navigate("/redeem")}
            >
              Redeem
            </a>
            <a
              href="#"
              className="hover:text-gray-400"
              onClick={() => navigate("/create")}
            >
              Create Event
            </a>
            <a
              href="#"
              className="hover:text-gray-400"
              onClick={() => navigate("/profile")}
            >
              Profile
            </a>
          </div>
          <div className="text-center text-sm">
            <p>
              Copyright ©2024; Designed by{" "}
              <span className="font-bold">Adios</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
