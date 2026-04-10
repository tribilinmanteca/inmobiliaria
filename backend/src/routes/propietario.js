const express = require("express");
const router = express.Router();
const db = require("../config/db");

//  GET
router.get("/", (req, res) => {
  const query = `
    SELECT c.idPropietario, p.nombre, p.apellido
    FROM propietario c
    JOIN persona p ON c.idPersona = p.idPersona
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

//  POST
router.post("/", (req, res) => {
  const { idPersona } = req.body;

  db.query(
    "INSERT INTO propietario (idPersona) VALUES (?)",
    [idPersona],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Propietario creado" });
    }
  );
});

//  DELETE
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM propietario WHERE idPropietario=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Eliminado" });
    }
  );
});

module.exports = router;