import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  // Prevent rendering when data not loaded
  if (!dashData) return null;

  return (
    <div className="m-5">
      {/* ======= SUMMARY CARDS ======= */}
      <div className="flex flex-wrap gap-3">
        {/* Earnings */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.earning_icon} alt="earnings" />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {currency} {dashData.earnings}
            </p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        {/* Appointments Count */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img
            className="w-14"
            src={assets.appointments_icon}
            alt="appointments"
          />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {dashData.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="patients" />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {dashData.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* ======= LATEST BOOKINGS ======= */}
      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="list" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4 border border-t-0 max-h-[60vh] overflow-y-auto">
          {(dashData.latestAppointments || []).map((item) => (
            <div
              key={item._id}
              className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
            >
              <img
                className="rounded-full w-10 h-10 object-cover bg-gray-200"
                src={item.userData.image || assets.user_icon}
                alt="patient"
              />

              <div className="flex-1 text-sm ml-3">
                <p className="text-gray-800 font-medium">
                  {item.userData.name}
                </p>
                <p className="text-gray-600">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>
              </div>

              {/* Status / Actions */}
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex gap-2">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-9 cursor-pointer hover:opacity-80"
                    src={assets.cancel_icon}
                    alt="cancel"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-9 cursor-pointer hover:opacity-80"
                    src={assets.tick_icon}
                    alt="complete"
                  />
                </div>
              )}
            </div>
          ))}

          {dashData.latestAppointments.length === 0 && (
            <p className="text-center py-6 text-gray-400">
              No recent bookings available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
