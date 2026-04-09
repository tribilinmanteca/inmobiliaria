import { useState, useEffect } from "react";
import axios from "axios";

function Empleado() {
  const [empleados, setEmpleados] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [idPersona, setIdPersona] = useState("");

  const obtenerEmpleados = async () => {
    const res = await axios.get("http://localhost:3001/api/empleado");
    setEmpleados(res.data);
  };

  const obtenerPersonas = async () => {
    const res = await axios.get("http://localhost:3001/api/persona");
    setPersonas(res.data);
  };

  useEffect(() => {
    obtenerEmpleados();
    obtenerPersonas();
  }, []);

  const crearEmpleado = async () => {
    await axios.post("http://localhost:3001/api/empleado", {
      idPersona,
    });
    obtenerEmpleados();
  };

  const eliminarEmpleado = async (id) => {
    await axios.delete(`http://localhost:3001/api/empleado/${id}`);
    obtenerEmpleados();
  };

  return (
    <div>
      <h2>Empleados</h2>

      <select onChange={(e) => setIdPersona(e.target.value)}>
        <option value="">Seleccione persona</option>
        {personas.map((p) => (
          <option key={p.idPersona} value={p.idPersona}>
            {p.nombre} {p.apellido}
          </option>
        ))}
      </select>

      <button onClick={crearEmpleado}>Crear Empleado</button>

      <ul>
        {empleados.map((e) => (
          <li key={e.idEmpleado}>
            {e.nombre} {e.apellido}

            <button onClick={() => eliminarEmpleado(e.idEmpleado)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Empleado;