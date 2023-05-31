import db from "@/models/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const dotenv = require('dotenv');
import { serialize } from "cookie";

dotenv.config({path: '.env'});

export default async function login(req, res) {

  try {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({
        error: "Missing email or password",
      });
      return;
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) {
          res.status(500).json({ error });
          return;
        }

        if (results.length === 0 || ! (await bcrypt.compare(password, results[0].password)) ) {
          res.status(401).json({
            error: "Invalid email or password",
          });
          return;
        }

        const user = results[0];
        const token = jwt.sign(
          {id: user.id},
          process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        )

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        }
        
        res.setHeader('Set-Cookie', serialize('token', token, cookieOptions));

        res.status(200).json({
          user: {
            id: user.id,
            email: user.email,
          },
        });
      }
    );
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error' });
  }
}