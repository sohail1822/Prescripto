import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded payload:", decoded);

    if (!req.body) req.body = {};

    // FIX: Support both _id and id safely
    req.body.userId = decoded.id || decoded._id;

    console.log("Injected userId:", req.body.userId);

    next();
  } catch (error) {
    console.log("AuthUser Error:", error);
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
