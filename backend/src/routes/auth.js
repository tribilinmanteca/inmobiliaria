const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/login", (req, res) => {
  console.log("BODY:", req.body);
  
//a
  const { usuario, contrasena } = req.body;

  const query = "SELECT * FROM login WHERE usuario = ? AND contrasena = ?";

  db.query(query, [usuario, contrasena], (err, results) => {
    if (err) {
      console.error("ERROR SQL:", err);
      return res.status(500).json({ error: err });
    }

    console.log("RESULTS:", results);

    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

router.post("/register", (req, res) => {
  const { usuario, contrasena } = req.body;

  const query = "INSERT INTO login (usuario, contrasena) VALUES (?, ?)";

  db.query(query, [usuario, contrasena], (err, result) => {
    if (err) {
      console.error("ERROR SQL:", err);
      return res.status(500).json({ error: err });
    }

    res.json({ success: true, message: "Usuario registrado" });
  });
});

module.exports = router;