// authDoctor.js
import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    const token = req.headers.dtoken;

    console.log("AuthDoctor → Received dtoken:", token);

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized. Please log in again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("AuthDoctor → Decoded payload:", decoded);

    if (!req.body) req.body = {};
    req.body.docId = decoded.id;

    console.log("AuthDoctor → Injected docId:", req.body.docId);

    next();
  } catch (error) {
    console.log("AuthDoctor ERROR:", error);
    return res.json({
      success: false,
      message: "Invalid or expired doctor token.",
    });
  }
};

export default authDoctor;
