import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/register", {
        usuario,
        contrasena,
      });

      if (res.data.success) {
        alert("Usuario registrado 🔥");
        navigate("/"); // volver al login
      }
    } catch (error) {
      console.error(error);
      alert("Error al registrar");
    }
  };

  return (
    <div>
      <h2>Registro</h2>

      <input
        placeholder="Usuario"
        onChange={(e) => setUsuario(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setContrasena(e.target.value)}
      />

      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}

export default Register;