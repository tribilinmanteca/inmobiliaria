const express = require("express");
const router = express.Router();
const db = require("../config/db");

//  GET
router.get("/", (req, res) => {
  db.query("SELECT * FROM tipopersona", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

//  POST
router.post("/", (req, res) => {
  const { descripcion } = req.body;

  db.query(
    "INSERT INTO tipopersona (descripcion) VALUES (?)",
    [descripcion],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ message: "Creado" });
    }
  );
});

//  PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;

  db.query(
    "UPDATE tipopersona SET descripcion=? WHERE idTipoPersona=?",
    [descripcion, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Actualizado" });
    }
  );
});

//  DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM tipopersona WHERE idTipoPersona=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Eliminado" });
    }
  );
});

module.exports = router;