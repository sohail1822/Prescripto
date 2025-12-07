import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ================= CHANGE AVAILABILITY ==================
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const doc = await doctorModel.findById(docId);

    if (!doc) return res.json({ success: false, message: "Doctor not found" });

    await doctorModel.findByIdAndUpdate(docId, {
      available: !doc.available,
    });

    res.json({ success: true, message: "Availability updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= GET DOCTOR LIST ==================
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({})
      .select(["-password", "-email", "-slots_booked"]);

    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= DOCTOR LOGIN ==================
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor)
      return res.json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid credentials" });

    const token = generateToken(doctor._id);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= DOCTOR APPOINTMENTS ==================
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= MARK APPOINTMENT COMPLETED ==================
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appt = await appointmentModel.findById(appointmentId);
    if (!appt) return res.json({ success: false, message: "Not found" });

    if (String(appt.docId) !== String(docId))
      return res.json({ success: false, message: "Unauthorized" });

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });

    res.json({ success: true, message: "Appointment completed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= CANCEL APPOINTMENT ==================
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appt = await appointmentModel.findById(appointmentId);
    if (!appt) return res.json({ success: false, message: "Not found" });

    if (String(appt.docId) !== String(docId))
      return res.json({ success: false, message: "Unauthorized" });

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= DOCTOR DASHBOARD ==================
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    let patientSet = new Set();

    appointments.forEach((appt) => {
      if (appt.isCompleted) earnings += appt.amount;
      patientSet.add(String(appt.userId));
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patientSet.size,
      latestAppointments: [...appointments].reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= GET DOCTOR PROFILE ==================
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;

    const profile = await doctorModel
      .findById(docId)
      .select("-password -slots_booked");

    res.json({ success: true, profileData: profile });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= UPDATE DOCTOR PROFILE ==================
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;

    if (!fees || !address)
      return res.json({ success: false, message: "Missing fields" });

    await doctorModel.findByIdAndUpdate(docId, {
      fees,
      address: JSON.parse(address),
      available,
    });

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
