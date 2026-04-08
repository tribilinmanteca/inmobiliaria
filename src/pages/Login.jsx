import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 IMPORTANTE

function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setPassword] = useState("");

  const navigate = useNavigate(); // 👈

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/login", {
        usuario,
        contrasena,
      });

      if (res.data.success) {
        alert("Login correcto 🔥");

        // 👉 GUARDAR SESIÓN
        localStorage.setItem("usuario", usuario);

        // 👉 REDIRIGIR
        navigate("/home");
      } else {
        alert("Credenciales incorrectas");
      }

    } catch (error) {
      if (error.response) {
        console.log("Datos del error:", error.response.data);
        console.log("Status:", error.response.status);
      } else if (error.request) {
        console.log("No se recibió respuesta del servidor");
      } else {
        console.log("Error de configuración:", error.message);
      }
      alert("Error en el servidor");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Usuario"
        onChange={(e) => setUsuario(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Ingresar</button>

      <button onClick={() => navigate("/register")}>
         Registrarse
      </button>
    </div>
  );
}

export default Login;