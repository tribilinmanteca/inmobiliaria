import { useEffect, useState } from "react";
import axios from "axios";

function Cliente() {
  const [clientes, setClientes] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [idPersona, setIdPersona] = useState("");

  const obtenerClientes = async () => {
    const res = await axios.get("http://localhost:3001/api/cliente");
    setClientes(res.data);
  };

  const obtenerPersonas = async () => {
    const res = await axios.get("http://localhost:3001/api/persona");
    setPersonas(res.data);
  };

  useEffect(() => {
    obtenerClientes();
    obtenerPersonas();
  }, []);

  const crearCliente = async () => {
    await axios.post("http://localhost:3001/api/cliente", {
      idPersona,
    });
    obtenerClientes();
  };

  const eliminarCliente = async (id) => {
    await axios.delete(`http://localhost:3001/api/cliente/${id}`);
    obtenerClientes();
  };

  return (
    <div>
      <h2>Clientes</h2>

      <select onChange={(e) => setIdPersona(e.target.value)}>
        <option value="">Seleccione persona</option>
        {personas.map((p) => (
          <option key={p.idPersona} value={p.idPersona}>
            {p.nombre} {p.apellido}
          </option>
        ))}
      </select>

      <button onClick={crearCliente}>Crear Cliente</button>

      <ul>
        {clientes.map((c) => (
          <li key={c.idCliente}>
            {c.nombre} {c.apellido}

            <button onClick={() => eliminarCliente(c.idCliente)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cliente;