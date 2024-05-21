import React from "react";
import { useNavigate } from "react-router-dom";
import "../navigation.css"; // Importa el archivo CSS para los estilos

const VerticalNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="vertical-nav">
      <ul>
        <li onClick={() => navigate("/tasks")}>Mis pedidos</li>
        <li onClick={() => navigate("/tasks/new")}>Realizar pedidos</li>
      </ul>
    </div>
  );
};

export default VerticalNavigation;
