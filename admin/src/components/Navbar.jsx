import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    // clear tokens FIRST
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }

    navigate("/");

    setTimeout(() => setIsLoggingOut(false), 500);
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />

        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : dToken ? "Doctor" : "Guest"}
        </p>
      </div>

      <button
        onClick={logout}
        disabled={isLoggingOut}
        className={`bg-primary text-white text-sm px-10 py-2 rounded-full transition ${
          isLoggingOut ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default Navbar;
