import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-40 bg-gradient-to-b from-blue-50 to-blue-100 pt-20 pb-10 px-6 md:px-12 rounded-t-3xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-16 text-sm">
        {/* Left */}
        <div>
          <img className="mb-6 w-44" src={assets.logo} alt="Logo" />

          <p className="w-full md:w-3/4 text-gray-700 leading-7">
            Delivering seamless digital experiences through clean interfaces,
            modern engineering practices, and reliable technology that grows
            with your vision.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-gray-900">Company</h3>
          <ul className="flex flex-col gap-3 text-gray-700">
            <li className="cursor-pointer hover:text-gray-900 transition">
              Home
            </li>
            <li className="cursor-pointer hover:text-gray-900 transition">
              About Us
            </li>
            <li className="cursor-pointer hover:text-gray-900 transition">
              Contact Us
            </li>
            <li className="cursor-pointer hover:text-gray-900 transition">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-gray-900">
            Get in Touch
          </h3>
          <ul className="flex flex-col gap-3 text-gray-700">
            <li className="cursor-pointer hover:text-gray-900 transition">
              +250-784-652-570
            </li>
            <li className="cursor-pointer hover:text-gray-900 transition">
              gyanendrakumar3555@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-14">
        <p className="py-6 text-sm text-center text-gray-600">
          © {new Date().getFullYear()} PrescriptoDev — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
