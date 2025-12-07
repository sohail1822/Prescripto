import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, SetDocImg] = useState(null);
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [experience, SetExperience] = useState("1 Year");
  const [fees, SetFees] = useState("");
  const [about, SetAbout] = useState("");
  const [speciality, SetSpeciality] = useState("General physician");
  const [degree, SetDegree] = useState("");
  const [address1, SetAddress1] = useState("");
  const [address2, SetAddress2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (!docImg) {
        setIsLoading(false);
        return toast.error("Please upload doctor image");
      }

      // Validate image type
      if (!["image/jpeg", "image/png", "image/jpg"].includes(docImg.type)) {
        setIsLoading(false);
        return toast.error("Only JPG/PNG images allowed");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);

      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      console.log("Submitting doctor data:");
      formData.forEach((val, key) => console.log(key, ":", val));

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            atoken: aToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Doctor Added Successfully");

        // Reset fields
        SetDocImg(null);
        SetName("");
        SetEmail("");
        SetPassword("");
        SetFees("");
        SetAbout("");
        SetDegree("");
        SetAddress1("");
        SetAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            id="doc-img"
            type="file"
            hidden
            onChange={(e) => SetDocImg(e.target.files[0])}
          />
          <p>Upload doctor picture</p>
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* Left Section */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div>
              <p>Doctor Name</p>
              <input
                value={name}
                onChange={(e) => SetName(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="text"
                required
              />
            </div>

            <div>
              <p>Doctor Email</p>
              <input
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="email"
                required
              />
            </div>

            <div>
              <p>Doctor Password</p>
              <input
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="password"
                required
              />
            </div>

            <div>
              <p>Experience</p>
              <select
                value={experience}
                onChange={(e) => SetExperience(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Fees</p>
              <input
                value={fees}
                onChange={(e) => SetFees(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="number"
                required
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div>
              <p>Speciality</p>
              <select
                value={speciality}
                onChange={(e) => SetSpeciality(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p>Education</p>
              <input
                value={degree}
                onChange={(e) => SetDegree(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="text"
                required
              />
            </div>

            <div>
              <p>Address</p>
              <input
                value={address1}
                onChange={(e) => SetAddress1(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Address Line 1"
                required
              />
              <input
                value={address2}
                onChange={(e) => SetAddress2(e.target.value)}
                className="border rounded px-3 py-2 w-full mt-2"
                type="text"
                placeholder="Address Line 2"
                required
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            value={about}
            onChange={(e) => SetAbout(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            rows={5}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type="submit"
          className={`bg-primary text-white px-10 py-3 mt-4 rounded-full ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Adding Doctor..." : "Add Doctor"}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
