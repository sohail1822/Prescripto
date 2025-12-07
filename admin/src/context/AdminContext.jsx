import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ------------ GET ALL DOCTORS ------------
  const getAllDoctors = async () => {
    if (!aToken) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        { headers: { atoken: aToken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log("Admin → Doctors loaded:", data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Admin → getAllDoctors Error:", error);
      toast.error(error.message);
    }
  };

  // ------------ CHANGE DOCTOR AVAILABILITY ------------
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        { headers: { atoken: aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Admin → changeAvailability Error:", error);
      toast.error(error.message);
    }
  };

  // ------------ GET ALL APPOINTMENTS ------------
  const getAllAppointments = async () => {
    if (!aToken) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { atoken: aToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
        console.log("Admin → Appointments loaded:", data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Admin → getAllAppointments Error:", error);
      toast.error(error.message);
    }
  };

  // ------------ CANCEL APPOINTMENT ------------
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointment`,
        { appointmentId },
        { headers: { atoken: aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Admin → cancelAppointment Error:", error);
      toast.error(error.message);
    }
  };

  // ------------ GET DASHBOARD DATA ------------
  const getDashData = async () => {
    if (!aToken) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { atoken: aToken },
      });

      if (data.success) {
        setDashData(data.dashData);
        console.log("Admin → Dashboard Data:", data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Admin → getDashData Error:", error);
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
