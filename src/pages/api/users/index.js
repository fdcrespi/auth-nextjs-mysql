
import db from "@/models/database";
import { handlerCheckAuth } from "../auth/handlerCheckAuth";

async function getUsers(req, res) {
  await db.query("SELECT * FROM users", (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Hubo un error" });
    }
    return res.status(200).json(results);
  });
}

async function createUser(req, res) {
  await db.query("INSERT INTO users SET ?", [req.body], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Hubo un error" });
    }
    return res.status(201).json({ message: "Usuario creado" });
  });
}

export default async function handler(req, res) {
  try {
    const decoded = handlerCheckAuth(req, res);
    await db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Hubo un error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "No se ha iniciado sesión" });
      }
      if (results[0].id_role && results[0].id_role === 1) {
        return res.status(401).json({ message: "Usuario sin permisos" });
      }
      else {
        const method = {
          GET: () => getUsers(req, res),
          POST: () => createUser(req, res),
        }[req.method];
        if (!method) {
          return res.status(400).json({
            message: "Método HTTP incorrecto",
          });
        } 
        method();
      }
    });
  
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error" });
  }
}
