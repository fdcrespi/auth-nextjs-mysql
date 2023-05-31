import jwt from 'jsonwebtoken';
import db from '@/models/database';

export default async function isAuthenticated(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No se ha iniciado sesión' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await db.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
    res.status(200).json({ user: req.user[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Hubo un error' });
  }
}
