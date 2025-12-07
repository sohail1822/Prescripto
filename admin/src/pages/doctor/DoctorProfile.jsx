import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets"; // for fallback image

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // -------- Update Doctor Profile -------- //
  const updateProfile = async () => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      const updateData = {
        fees: Number(profileData.fees),
        address: profileData.address,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Load doctor profile on token change
  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  // No profile yet? avoid UI crash
  if (!profileData) return null;

  // Safe destructuring
  const address = profileData.address || { line1: "", line2: "" };

  return (
    <div className="m-5">
      <div className="flex flex-col gap-4">
        {/* -------- Doctor Image -------- */}
        <div>
          <img
            className="bg-primary/80 w-full sm:max-w-64 rounded-lg object-cover"
            src={profileData.image || assets.user_icon}
            alt="Doctor"
          />
        </div>

        {/* -------- Profile Details Card -------- */}
        <div className="flex-1 border border-stone-200 rounded-lg p-8 bg-white">
          {/* Doctor Name + Degree */}
          <p className="flex items-center gap-2 text-3xl font-semibold text-gray-700">
            {profileData.name}
          </p>

          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <p>
              {profileData.degree} — {profileData.speciality}
            </p>
            <span className="py-0.5 px-2 border rounded-full text-xs">
              {profileData.experience}
            </span>
          </div>

          {/* About */}
          <div className="mt-4">
            <p className="font-medium text-neutral-800">About:</p>
            <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
          </div>

          {/* Fees */}
          <p className="text-gray-600 font-medium mt-4">
            Appointment Fee:{" "}
            <span className="text-gray-900">
              {currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  className="border px-2 py-1 ml-2 rounded w-24"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          {/* Address */}
          <div className="mt-4 text-gray-700">
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full mt-1"
                  value={address.line1}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full mt-2"
                  value={address.line2}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </>
            ) : (
              <p className="text-sm mt-1">
                {address.line1} <br /> {address.line2}
              </p>
            )}
          </div>

          {/* Availability Checkbox */}
          <div className="flex gap-2 mt-4 items-center">
            <input
              type="checkbox"
              checked={profileData.available}
              disabled={!isEdit}
              onChange={() =>
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
            />
            <label className="text-gray-700">Available</label>
          </div>

          {/* Buttons */}
          {isEdit ? (
            <button
              disabled={isUpdating}
              onClick={updateProfile}
              className={`px-6 py-2 border border-primary rounded-full text-sm mt-6
                hover:bg-primary hover:text-white transition-all
                ${isUpdating ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 border border-primary rounded-full text-sm mt-6 hover:bg-primary hover:text-white transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
