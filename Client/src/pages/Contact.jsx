import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
      {/* Heading */}
      <div className="text-center text-3xl pt-16 text-gray-600">
        <p>
          CONTACT <span className="text-gray-800 font-semibold">US</span>
        </p>
      </div>

      {/* Main Section */}
      <div className="mt-16 mb-32 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">
        {/* Image */}
        <div className="flex justify-center md:justify-start">
          <img
            className="w-full max-w-[420px] rounded-xl shadow-md"
            src={assets.contact_image}
            alt="contact"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col gap-8 text-[16px] max-w-lg">
          {/* Office Info */}
          <div>
            <p className="font-semibold text-2xl text-gray-800 mb-2">
              Our Office
            </p>
            <p className="text-gray-600 leading-7">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-gray-600 leading-7">
              Tel: (415) 555-0132 <br />
              Email: elyseniyibizi502@gmail.com
            </p>
          </div>

          {/* Careers */}
          <div className="pt-2">
            <p className="font-semibold text-2xl text-gray-800 mb-2">
              Careers at Prescripto
            </p>
            <p className="text-gray-600 leading-7">
              Learn more about our teams and job openings.
            </p>
          </div>

          {/* Button */}
          <button className="border border-black px-10 py-3 text-[15px] rounded-md hover:bg-black hover:text-white transition-all duration-300 w-fit">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
