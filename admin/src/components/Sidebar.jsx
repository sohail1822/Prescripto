import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // unified styling function
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all
     ${
       isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : "hover:bg-gray-100"
     }`;

  return (
    <div className="min-h-screen bg-white border-r">
      {/* Admin Sidebar */}
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink className={linkClass} to="/admin-dashboard">
            <img src={assets.home_icon} alt="dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink className={linkClass} to="/all-appointments">
            <img src={assets.appointment_icon} alt="appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink className={linkClass} to="/add-doctor">
            <img src={assets.add_icon} alt="add" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          <NavLink className={linkClass} to="/doctor-list">
            <img src={assets.people_icon} alt="doctors" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {/* Doctor Sidebar */}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink className={linkClass} to="/doctor-dashboard">
            <img src={assets.home_icon} alt="dashboard" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink className={linkClass} to="/doctor-appointments">
            <img src={assets.appointment_icon} alt="appointments" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink className={linkClass} to="/doctor-profile">
            <img src={assets.people_icon} alt="profile" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}

      {/* No token */}
      {!aToken && !dToken && (
        <div className="p-5 text-gray-500 text-sm">No user logged in.</div>
      )}
    </div>
  );
};

export default Sidebar;
