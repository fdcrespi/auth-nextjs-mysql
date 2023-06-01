import jwt from 'jsonwebtoken';
import db from '@/models/database';
import { handlerCheckAuth } from '../auth/handlerCheckAuth';

async function getUser(req, res) {
  await db.query('SELECT * FROM users WHERE id = ?', [req.query.id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Hubo un error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(results[0]);
  });
}

function updateUser(req, res) {
  const { id } = req.query;
  const { name, email } = req.body;
  const user = users.find(user => user.id === id);
  user.name = name;
  user.email = email;
  res.status(200).json(user);
}

function deleteUser(req, res) {
  const { id } = req.query;
  const userIndex = users.findIndex(user => user.id === id);
  users.splice(userIndex, 1);
  res.status(200).json(users);
}

export default async function handler(req, res) {
  handlerCheckAuth(req, res);

  const method = {
    GET: () => getUser(req, res),
    PUT: () => updateUser(req, res),
    DELETE: () => deleteUser(req, res),
  }[req.method];
  
  if (!method) {
    return res.status(400).json({
      message: 'Método HTTP incorrecto',
    });
  }

  method(); 
}
