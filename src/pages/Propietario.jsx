import { useState, useEffect } from "react";
import axios from "axios";function Propietario() {
  
  const [propietarios, setPropietarios] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [idPersona, setIdPersona] = useState("");

  const obtenerPropietarios = async () => {
    const res = await axios.get("http://localhost:3001/api/propietario");
    setPropietarios(res.data);
  };

  const obtenerPersonas = async () => {
    const res = await axios.get("http://localhost:3001/api/persona");
    setPersonas(res.data);
  };

  useEffect(() => {
    obtenerPropietarios();
    obtenerPersonas();
  }, []);

  const crearPropietario = async () => {
    await axios.post("http://localhost:3001/api/propietario", {
      idPersona,
    });
    obtenerPropietarios();
  };

  const eliminarPropietario = async (id) => {
    await axios.delete(`http://localhost:3001/api/propietario/${id}`);
    obtenerPropietarios();
  };

  return (
    <div>
      <h2>Propietarios</h2>

      <select onChange={(e) => setIdPersona(e.target.value)}>
        <option value="">Seleccione persona</option>
        {personas.map((p) => (
          <option key={p.idPersona} value={p.idPersona}>
            {p.nombre} {p.apellido}
          </option>
        ))}
      </select>

      <button onClick={crearPropietario}>Crear Propietario</button>

      <ul>
        {propietarios.map((p) => (
          <li key={p.idPropietario}>
            {p.nombre} {p.apellido}

            <button onClick={() => eliminarPropietario(p.idPropietario)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Propietario;

