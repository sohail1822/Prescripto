import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const arr = slotDate.split("_");
    return `${arr[0]} ${months[Number(arr[1])]} ${arr[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    } else {
       setLoading(false);
    }
  }, [token]);

  return (
    <div className="px-4 lg:px-10">
      <p className="pb-3 mt-12 text-lg font-semibold text-zinc-700 border-b">
        My Appointments
      </p>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <p className="text-zinc-500">Loading appointments...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="mt-10 flex justify-center">
          <p className="text-zinc-500">No appointments found.</p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={item.docData.image}
                  className="w-32 h-40 rounded-lg bg-indigo-50 object-cover"
                  alt=""
                />

                <div className="flex-1 text-sm text-zinc-600 space-y-1">
                  <p className="text-lg font-semibold">{item.docData.name}</p>
                  <p>{item.docData.speciality}</p>

                  <p className="mt-3 font-medium">Address:</p>
                  <p className="text-xs">{item.docData.address.line1}</p>
                  <p className="text-xs">{item.docData.address.line2}</p>

                  <p className="text-xs mt-3">
                    <span className="font-medium">Date & Time:</span>{" "}
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>

                <div className="flex flex-col gap-3 justify-end">
                  {!item.cancelled && !item.isCompleted && (
                    <button className="border py-2 rounded text-sm hover:bg-primary hover:text-white transition-all sm:min-w-48">
                      Pay Online
                    </button>
                  )}

                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="border py-2 rounded text-sm hover:bg-red-600 hover:text-white transition-all sm:min-w-48"
                    >
                      Cancel Appointment
                    </button>
                  )}

                  {item.cancelled && (
                    <button className="border py-2 rounded text-red-500 border-red-500 sm:min-w-48">
                      Appointment Cancelled
                    </button>
                  )}

                  {item.isCompleted && (
                    <button className="border py-2 rounded text-green-600 border-green-600 sm:min-w-48">
                      Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
