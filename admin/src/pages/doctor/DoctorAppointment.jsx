import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  // Do NOT mutate original array -> make a reversed copy
  const sortedAppointments = [...appointments].reverse();

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        {/* HEADER */}
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-gray-50">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* ROWS */}
        {sortedAppointments.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-wrap justify-between max-sm:gap-5 sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50 transition"
          >
            {/* Index */}
            <p className="max-sm:hidden">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full object-cover bg-gray-200"
                src={item.userData.image || assets.user_icon}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Payment */}
            <p className="text-xs border border-primary px-2 rounded-full">
              {item.payment ? "Online" : "Cash"}
            </p>

            {/* Age */}
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p>
              {currency}
              {item.amount}
            </p>

            {/* Actions */}
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex gap-2">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 cursor-pointer hover:opacity-80"
                  src={assets.cancel_icon}
                  alt="cancel"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-8 cursor-pointer hover:opacity-80"
                  src={assets.tick_icon}
                  alt="complete"
                />
              </div>
            )}
          </div>
        ))}

        {sortedAppointments.length === 0 && (
          <p className="text-center py-10 text-gray-400">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
