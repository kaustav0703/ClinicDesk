import jwt from "jsonwebtoken";
import Doctor from "../models/doctorModel.js";

export const verifyToken = async (req, res, next) => {

  console.log("Authorization Header:", req.headers.authorization);
  console.log("Cookies:", req.cookies);
  console.log("doctorToken Cookie:", req.cookies?.doctorToken);

  let token;

  // ✅ Try Authorization header
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // ✅ If not in header, check cookies
  if (!token && req.cookies?.doctorToken) {
    token = req.cookies.doctorToken;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.doctor = await Doctor.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
