import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import TipoPersona from "../pages/TipoPersona";
import Persona from "../pages/Persona";
import Cliente from "../pages/Cliente";
import Empleado from "../pages/Empleado";
import Propietario from "../pages/Propietario";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tipopersona" element={<TipoPersona />} />
        <Route path="/persona" element={<Persona />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/propietario" element={<Propietario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;