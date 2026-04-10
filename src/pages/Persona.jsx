import { useEffect, useState } from "react";
import axios from "axios";

function Persona() {
  const [personas, setPersonas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [form, setForm] = useState({
    idTipoPersona: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    domicilio: "",
    telefono: "",
    correo: ""
  });

  //  cargar personas
  const obtenerPersonas = async () => {
    const res = await axios.get("http://localhost:3001/api/persona");
    setPersonas(res.data);
  };

  //  cargar tipos
  const obtenerTipos = async () => {
    const res = await axios.get("http://localhost:3001/api/tipopersona");
    setTipos(res.data);
  };

  useEffect(() => {
    obtenerPersonas();
    obtenerTipos();
  }, []);

  //  manejar inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //  crear
  const crearPersona = async () => {
    await axios.post("http://localhost:3001/api/persona", form);
    obtenerPersonas();
  };

  //editar
 const seleccionarPersona = (persona) => {
  setForm({
    idTipoPersona: persona.idTipoPersona,
    nombre: persona.nombre,
    apellido: persona.apellido,
    fechaNacimiento: persona.fechaNacimiento?.split("T")[0],
    domicilio: persona.domicilio,
    telefono: persona.telefono,
    correo: persona.correo
  });

  setEditando(true);
  setIdEditar(persona.idPersona);
};

//update
const actualizarPersona = async () => {
  await axios.put(
    `http://localhost:3001/api/persona/${idEditar}`,
    form
  );

  setEditando(false);
  setIdEditar(null);
  obtenerPersonas();
};

  //  eliminar
  const eliminarPersona = async (id) => {
    await axios.delete(`http://localhost:3001/api/persona/${id}`);
    obtenerPersonas();
  };

  return (
    <div>
      <h2>Personas</h2>

      {/* FORM */}
      <select name="idTipoPersona" onChange={handleChange}>
        <option value="">Seleccione tipo</option>
        {tipos.map((t) => (
          <option key={t.idTipoPersona} value={t.idTipoPersona}>
            {t.descripcion}
          </option>
        ))}
      </select>

      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="apellido" placeholder="Apellido" onChange={handleChange} />
      <input name="fechaNacimiento" type="date" onChange={handleChange} />
      <input name="domicilio" placeholder="Domicilio" onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
      <input name="correo" placeholder="Correo" onChange={handleChange} />

      <button onClick={editando ? actualizarPersona : crearPersona}>
        {editando ? "Actualizar" : "Crear"}
      </button>

      {/* LISTA */}
      <ul>
        {personas.map((p) => (
          <li key={p.idPersona}>
            {p.nombre} {p.apellido} - {p.descripcion}

            <button onClick={() => eliminarPersona(p.idPersona)}>
              Eliminar
            </button>

            <button onClick={() => seleccionarPersona(p)}>
             Editar
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}


export default Persona;