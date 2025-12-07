import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  if (!dashData)
    return <div className="m-10 text-gray-500">Loading dashboard...</div>;

  return (
    <div className="m-5">
      {/* ----------- Top Stats Cards ----------- */}
      <div className="flex flex-wrap gap-3">
        <StatCard
          icon={assets.doctor_icon}
          label="Doctors"
          value={dashData.doctors}
        />
        <StatCard
          icon={assets.appointments_icon}
          label="Appointments"
          value={dashData.appointments}
        />
        <StatCard
          icon={assets.patients_icon}
          label="Patients"
          value={dashData.patients}
        />
      </div>

      {/* ----------- Latest Bookings ----------- */}
      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments.length === 0 && (
            <p className="text-center py-6 text-gray-500">
              No recent bookings available.
            </p>
          )}

          {dashData.latestAppointments.map((item) => {
            const doctor = item.docData || {};

            return (
              <div
                key={item._id}
                className="flex items-center px-6 py-3 hover:bg-gray-100"
              >
                <img
                  className="rounded-full w-10 h-10 object-cover bg-gray-200"
                  src={doctor.image || assets.user_icon}
                  alt="doctor"
                />

                <div className="flex-1 text-sm ml-3">
                  <p className="text-gray-800 font-medium">
                    {doctor.name || "Unknown Doctor"}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <img
                    className={`w-10 cursor-pointer ${
                      processingId === item._id
                        ? "opacity-40 pointer-events-none"
                        : ""
                    }`}
                    src={assets.cancel_icon}
                    alt="cancel"
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
    </div>
  );
};

const StatCard = ({ icon, value, label }) => (
  <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
    <img className="w-14" src={icon} alt="" />
    <div>
      <p className="text-xl font-semibold text-gray-600">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  </div>
);

export default Dashboard;
