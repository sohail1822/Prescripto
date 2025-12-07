import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>

      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group bg-white shadow-sm hover:shadow-md transition"
          >
            <img
              className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 w-full h-40 object-cover"
              src={item.image || assets.user_icon}
              alt={item.name}
            />

            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {item.name}
              </p>

              <p className="text-zinc-600 text-sm">{item.speciality}</p>

              <div className="mt-3 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={item.available}
                  disabled={processingId === item._id}
                  onChange={async () => {
                    if (processingId) return;
                    setProcessingId(item._id);
                    await changeAvailability(item._id);
                    setProcessingId(null);
                  }}
                  className="cursor-pointer"
                />
                <p className="text-gray-600">Available</p>
              </div>
            </div>
          </div>
        ))}

        {doctors.length === 0 && (
          <p className="text-gray-500 w-full text-center py-10">
            No doctors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
