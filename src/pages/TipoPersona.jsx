import { useEffect, useState } from "react";
import axios from "axios";

function TipoPersona() {
  const [tipos, setTipos] = useState([]);
  const [descripcion, setDescripcion] = useState("");

  // 🔹 OBTENER DATOS
  const obtenerTipos = async () => {
    const res = await axios.get("http://localhost:3001/api/tipopersona");
    setTipos(res.data);
  };

  useEffect(() => {
    obtenerTipos();
  }, []);

  // 🔹 CREAR
  const crearTipo = async () => {
    await axios.post("http://localhost:3001/api/tipopersona", {
      descripcion,
    });
    setDescripcion("");
    obtenerTipos();
  };

  // 🔹 ELIMINAR
  const eliminarTipo = async (id) => {
    await axios.delete(`http://localhost:3001/api/tipopersona/${id}`);
    obtenerTipos();
  };

  // 🔹 EDITAR
  const editarTipo = async (id) => {
    const nuevaDescripcion = prompt("Nueva descripción:");
    if (!nuevaDescripcion) return;

    await axios.put(`http://localhost:3001/api/tipopersona/${id}`, {
      descripcion: nuevaDescripcion,
    });

    obtenerTipos();
  };

  return (
    <div>
      <h2>Tipo Persona</h2>

      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <button onClick={crearTipo}>Crear</button>

      <ul>
        {tipos.map((t) => (
          <li key={t.idTipoPersona}>
            {t.descripcion}

            <button onClick={() => editarTipo(t.idTipoPersona)}>
              Editar
            </button>

            <button onClick={() => eliminarTipo(t.idTipoPersona)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipoPersona;