const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const tipoPersonaRoutes = require("./routes/tipoPersona");
const app = express();

require("./config/db");

app.use(cors());
app.use(express.json());
app.use("/api/tipopersona", tipoPersonaRoutes);
app.use("/api", authRoutes);

app.listen(3001, () => {
  console.log("Servidor en puerto 3001");
});

