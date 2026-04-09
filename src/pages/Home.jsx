import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {

const navigate = useNavigate();
  return (
    <div>
         <button onClick={() => navigate("/tipopersona")}>
            Ir a TipoPersona
        </button>

        <button onClick={() => navigate("/persona")}>
            Ir a Persona
        </button>

        <button onClick={() => navigate("/cliente")}>
            Ir a Cliente
        </button> 

        <button onClick={() => navigate("/empleado")}>
            Ir a Empleado
        </button> 

        <button onClick={() => navigate("/propietario")}>
            Ir a Propietario
        </button> 
    </div>
  );
}

export default Home;