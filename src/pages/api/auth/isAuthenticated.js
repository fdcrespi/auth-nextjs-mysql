import jwt from 'jsonwebtoken';
import db from '@/models/database';

export default async function isAuthenticated(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No se ha iniciado sesión' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Hubo un error' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'No se ha iniciado sesión' });
      }
      req.user = results[0];
      return res.status(200).json({ user: req.user, token });
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Hubo un error' });
  }
}
