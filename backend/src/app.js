const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const tipoPersonaRoutes = require("./routes/tipoPersona");
const personaRoutes = require("./routes/persona");
const clienteRoutes = require("./routes/cliente");
const empleadoRoutes = require("./routes/empleado");
const propietarioRoutes = require("./routes/propietario");
const app = express();


require("./config/db");

app.use(cors());
app.use(express.json());
app.use("/api/persona", personaRoutes);
app.use("/api/tipopersona", tipoPersonaRoutes);
app.use("/api/cliente", clienteRoutes);
app.use("/api/empleado", empleadoRoutes);
app.use("/api/propietario", propietarioRoutes);
app.use("/api", authRoutes);

app.listen(3001, () => {
  console.log("Servidor en puerto 3001");
});

