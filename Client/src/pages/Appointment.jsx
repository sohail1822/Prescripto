import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctor";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const navigate = useNavigate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch doctor info from global doctor list
  const fetchDocInfo = async () => {
    const found = doctors.find((doc) => doc._id === docId);
    setDocInfo(found || null);
  };

  // Generate Appointment Slots
  const getAvailableSlots = async () => {
    if (!docInfo) return; // Prevent undefined errors

    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        const time = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const booked =
          docInfo.slots_booked?.[slotDate]?.includes(time) ?? false;

        if (!booked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!docSlots.length || !docSlots[slotIndex]?.length) {
      toast.error("Please select a valid date");
      return;
    }

    if (!slotTime) {
      toast.error("Please choose a time slot");
      return;
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${
        date.getMonth() + 1
      }_${date.getFullYear()}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="px-4 lg:px-10 mt-10">
        {/* -------------------- Doctor Details -------------------- */}
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full sm:max-w-72 aspect-[4/5] object-cover object-center rounded-lg bg-blue-50"
          />

          <div className="flex-1 border border-gray-300 rounded-lg p-8 bg-white">
            <p className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              {docInfo.degree} - {docInfo.speciality}
              <span className="px-2 py-0.5 border rounded-full text-xs">
                {docInfo.experience}
              </span>
            </p>

            <p className="flex items-center gap-1 text-sm font-medium text-gray-700 mt-4">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-600 mt-1">{docInfo.about}</p>

            <p className="text-gray-600 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-900">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* -------------------- Booking Slots -------------------- */}
        <div className="mt-8 font-medium text-gray-700">
          <p className="text-lg">Booking Slots</p>

          {/* Dates */}
          <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
            {docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-5 min-w-16 rounded-full cursor-pointer 
                  ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-300 text-gray-600"
                  }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>

          {/* Times */}
          <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
            {docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-5 py-2 rounded-full text-sm cursor-pointer 
                  ${
                    slotTime === item.time
                      ? "bg-primary text-white"
                      : "border border-gray-300 text-gray-500"
                  }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white px-16 py-3 rounded-full text-sm mt-6"
          >
            Book Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
