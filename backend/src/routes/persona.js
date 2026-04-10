const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET
router.get("/", (req, res) => {
  const query = `
    SELECT p.*, t.descripcion 
    FROM persona p
    JOIN tipopersona t ON p.idTipoPersona = t.idTipoPersona
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST
router.post("/", (req, res) => {
  const {
    idTipoPersona,
    nombre,
    apellido,
    fechaNacimiento,
    domicilio,
    telefono,
    correo
  } = req.body;

  const query = `
    INSERT INTO persona 
    (idTipoPersona, nombre, apellido, fechaNacimiento, domicilio, telefono, correo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [idTipoPersona, nombre, apellido, fechaNacimiento, domicilio, telefono, correo],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Persona creada" });
    }
  );
});

  // EDITAR
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const {
    idTipoPersona,
    nombre,
    apellido,
    fechaNacimiento,
    domicilio,
    telefono,
    correo
  } = req.body;

  const query = `
    UPDATE persona 
    SET idTipoPersona=?, nombre=?, apellido=?, fechaNacimiento=?, domicilio=?, telefono=?, correo=?
    WHERE idPersona=?
  `;

  db.query(
    query,
    [idTipoPersona, nombre, apellido, fechaNacimiento, domicilio, telefono, correo, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Persona actualizada" });
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM persona WHERE idPersona=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Eliminado" });
    }
  );
});

module.exports = router;