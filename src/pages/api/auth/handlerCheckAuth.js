import jwt from "jsonwebtoken";
import db from '@/models/database';

export const handlerCheckAuth = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || token === "null") {
    //return res.status(401).json({ message: "Usuario sin permisos" });
    console.log("Token not found");
    throw new Error("Token not found");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    //return res.status(401).json({ message: "No se ha iniciado sesión" });
    throw new Error("No se ha iniciado sesión");
  } 
  return decoded;
  
};
