import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  if (!appointments || appointments.length === 0)
    return (
      <div className="m-10 text-center text-gray-500">
        No appointments found.
      </div>
    );

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header Row */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => {
          const user = item?.userData || {};
          const doctor = item?.docData || {};

          return (
            <div
              key={item._id}
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            >
              {/* Index */}
              <p className="max-sm:hidden">{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full object-cover bg-gray-200"
                  src={user.image || assets.user_icon}
                  alt="Patient"
                />
                <p>{user.name || "Unknown"}</p>
              </div>

              {/* Age */}
              <p className="max-sm:hidden">
                {user.dob ? calculateAge(user.dob) : "N/A"}
              </p>

              {/* Date & Time */}
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              {/* Doctor */}
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full object-cover bg-gray-200"
                  src={doctor.image || assets.user_icon}
                  alt="Doctor"
                />
                <p>{doctor.name || "Unknown"}</p>
              </div>

              {/* Fees */}
              <p>
                {currency}
                {item.amount}
              </p>

              {/* Action Buttons */}
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <img
                  className={`w-10 cursor-pointer ${
                    processingId === item._id
                      ? "opacity-40 pointer-events-none"
                      : ""
                  }`}
                  src={assets.cancel_icon}
                  alt="Cancel"
                  onClick={async () => {
                    if (processingId) return;
                    setProcessingId(item._id);
                    await cancelAppointment(item._id);
                    setProcessingId(null);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllAppointments;
