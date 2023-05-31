import db from "@/models/database";
import bcrypt from "bcryptjs";

export default async function register (req, res) { 

  try {
    const { email, password, passwordConfirm } = req.body;

    // 1) Verificar que no exista el usuario
    const rows = await db.query('SELECT email FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    // 2) Verificar que las contraseñas sean iguales
    if (password !== passwordConfirm) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    // 3) Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4) Guardar el usuario en la base de datos
    await db.query('INSERT INTO users SET ?', {
        email,
        password: passwordHash
    });

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Hubo un error' });
  }

}