
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

function createUser(req, res) {
  const { name, email } = req.body;
  const newUser = {
    id: uuidv4(),
    name,
    email,
  };
  users.push(newUser);
  res.status(200).json(newUser);
}

export default async function handler(req, res) {
  handlerCheckAuth(req, res);

  const method = {
    GET: () => {
      if (req.query.id) {
        getUser(req, res);
      } else {
        getUsers(req, res);
      }
    },
    POST: () => createUser(req, res),
  }[req.method];

  if (!method) {
    return res.status(400).json({
      message: "Método HTTP incorrecto",
    });
  }

  method();
}
