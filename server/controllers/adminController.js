import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// ================= GENERATE ADMIN TOKEN ==================
const generateAdminToken = () => {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ================= ADD DOCTOR ==================
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // Validate all required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    // Check if doctor already exists
    const exists = await doctorModel.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "Email already registered" });

    // Validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload image to Cloudinary
    let imageUrl = "";
    try {
      const uploadRes = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = uploadRes.secure_url;
    } catch (err) {
      return res.json({
        success: false,
        message: "Image upload failed",
      });
    }

    // Parse Address safely
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch {
      return res.json({ success: false, message: "Invalid address format" });
    }

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      date: Date.now(),
    };

    await new doctorModel(doctorData).save();

    res.json({ success: true, message: "Doctor Added Successfully" });
  } catch (error) {
    console.error("Add Doctor ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// ================= ADMIN LOGIN ==================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = generateAdminToken();
      return res.json({ success: true, token });
    }

    return res.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= ALL DOCTORS ==================
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find().select("-password -slots_booked");

    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= ALL APPOINTMENTS ==================
const appointmentsAdmin = async (req, res) => {
  try {
    const appts = await appointmentModel.find({});
    res.json({ success: true, appointments: appts });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= CANCEL APPOINTMENT ==================
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appt = await appointmentModel.findById(appointmentId);

    if (!appt) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appt;

    const doctor = await doctorModel.findById(docId);

    if (doctor && doctor.slots_booked?.[slotDate]) {
      doctor.slots_booked[slotDate] = doctor.slots_booked[slotDate].filter(
        (t) => t !== slotTime
      );
      await doctorModel.findByIdAndUpdate(docId, {
        slots_booked: doctor.slots_booked,
      });
    }

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error("Admin Cancel ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// ================= ADMIN DASHBOARD ==================
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    // Sort by newest first
    appointments.sort((a, b) => b.date - a.date);

    const dashData = {
      doctors: doctors.length,
      patients: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error("Dashboard ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
