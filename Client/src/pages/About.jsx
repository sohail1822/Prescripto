import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-20">
      {/* About Us Heading */}
      <div className="text-center text-3xl pt-12 text-gray-600 font-light">
        <p>
          ABOUT <span className="text-gray-800 font-medium">US</span>
        </p>
      </div>

      {/* About Section */}
      <div className="my-12 flex flex-col md:flex-row items-center md:items-start gap-10">
        <img
          className="w-full md:max-w-[380px] rounded-lg shadow-sm"
          src={assets.about_image}
          alt=""
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/3 text-[15px] leading-6 text-gray-700">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. We understand the
            challenges individuals face when it comes to scheduling doctor
            appointments and managing their health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously enhance our platform with modern advancements to
            improve user experience. Whether you're booking your first
            appointment or managing ongoing care, Prescripto supports you every
            step of the way.
          </p>

          <b className="text-gray-900 text-lg">Our Vision</b>

          <p>
            Our vision is to create a seamless healthcare experience for every
            user. We aim to bridge the gap between patients and healthcare
            providers, making it easier for you to access the care you need,
            when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-2xl mt-10 mb-6">
        <p>
          WHY <span className="text-gray-800 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <div className="border p-8 sm:p-12 flex flex-col gap-4 text-[15px] text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 rounded-lg shadow-sm">
          <b className="text-lg">Efficiency</b>
          <p>
            Streamlined appointment scheduling that fits your busy lifestyle.
          </p>
        </div>

        <div className="border p-8 sm:p-12 flex flex-col gap-4 text-[15px] text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 rounded-lg shadow-sm">
          <b className="text-lg">Convenience</b>
          <p>Access a network of trusted healthcare professionals.</p>
        </div>

        <div className="border p-8 sm:p-12 flex flex-col gap-4 text-[15px] text-gray-700 hover:bg-primary hover:text-white transition-all duration-300 rounded-lg shadow-sm">
          <b className="text-lg">Personalization</b>
          <p>Get tailored recommendations and reminders for better health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
