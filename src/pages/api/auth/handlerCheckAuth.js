import jwt from "jsonwebtoken";

export const handlerCheckAuth = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token === "null") {
      return res.status(401).json({ message: "Usuario sin permisos" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.id === "1") {
      return res.status(401).json({ message: "No se ha iniciado sesión o usuario sin permisos" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
