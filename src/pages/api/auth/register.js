import connection from "@/models/database";
import bcryptjs from "bcryptjs";

function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "Missing email or password",
    });
    return;
  }

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        res.status(500).json({ error });
        return;
      }

      if (results.length > 0) {
        res.status(401).json({
          error: "Email already exists",
        });
        return;
      }

      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);

      connection.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hash],
        (error, results) => {
          if (error) {
            res.status(500).json({ error });
            return;
          }

          res.status(200).json({
            user: {
              id: results.insertId,
              email,
            },
          });
        }
      );
    }
  );
}

export default register;