import connection from "@/models/database";
import bcryptjs from "bcryptjs";

function login(req, res) {
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

      if (results.length === 0 || !bcryptjs.compareSync(password, results[0].password)) {
        res.status(401).json({
          error: "Invalid email or password",
        });
        return;
      }

      const user = results[0];

      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
        },
      });
    }
  );
}

export default login;