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

async function updateUser(req, res) {
  await db.query('UPDATE users SET ? WHERE id = ?', [req.body, req.query.id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Hubo un error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ message: 'Usuario actualizado' });
  });
}

async function deleteUser(req, res) {
  await db.query('DELETE FROM users WHERE id = ?', [req.query.id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Hubo un error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ message: 'Usuario eliminado' });
  });
}

export default async function handler(req, res) {
  try {
    const decoded = handlerCheckAuth(req);
    await db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Hubo un error' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'No se ha iniciado sesión' });
      }
      if (results[0].id_role && results[0].id_role === 1) {
        return res.status(401).json({ message: 'Usuario sin permisos' });
      }
      else {
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
    });
  } catch (error) {
    return res.status(500).json({ message: 'Hubo un error' });
  }
}
