import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const filterOptions = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="px-4 lg:px-10 my-10">
      <p className="text-gray-700 text-lg font-medium">
        Browse through the doctors specialist.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 mt-6">
        {/* Filter Section */}
        <div className="sm:w-64">
          <button
            className={`py-2 px-3 border rounded text-sm transition-all sm:hidden ${
              showFilter ? "bg-primary text-white" : ""
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filters
          </button>

          <div
            className={`flex flex-col gap-3 mt-3 text-sm text-gray-700 ${
              showFilter ? "flex" : "hidden sm:flex"
            }`}
          >
            {filterOptions.map((option, index) => (
              <p
                key={index}
                onClick={() =>
                  speciality === option
                    ? navigate("/doctors")
                    : navigate(`/doctors/${option}`)
                }
                className={`pl-4 py-2 pr-10 border border-gray-300 rounded cursor-pointer transition-all 
                  ${
                    speciality === option
                      ? "bg-blue-100 text-blue-900 font-medium"
                      : "hover:bg-gray-100"
                  }`}
              >
                {option}
              </p>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden bg-white shadow-sm 
                         hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              {/* FIXED IMAGE */}
              <div className="w-full aspect-[4/5] bg-blue-50 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-4 space-y-2">
                {/* Availability */}
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></span>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>

                {/* Name */}
                <p className="text-gray-900 text-lg font-semibold">
                  {item.name}
                </p>

                {/* Specialty */}
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
