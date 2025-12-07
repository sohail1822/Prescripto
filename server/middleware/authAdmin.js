import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const token = req.headers.atoken;

    console.log("AuthAdmin → Received token:", token);

    if (!token) {
      return res.json({
        success: false,
        message: "Admin token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("AuthAdmin → Decoded token:", decoded);

    // FIX: Check only for admin role
    if (!decoded.role || decoded.role !== "admin") {
      return res.json({
        success: false,
        message: "Not authorized.",
      });
    }

    // Attach admin info if needed
    req.admin = decoded;

    next();
  } catch (error) {
    console.log("AuthAdmin ERROR:", error);
    return res.json({
      success: false,
      message: "Invalid or expired admin token.",
    });
  }
};

export default authAdmin;
