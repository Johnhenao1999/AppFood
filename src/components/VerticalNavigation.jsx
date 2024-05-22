import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../navigation.css"; // Importa el archivo CSS para los estilos

const VerticalNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className={`vertical-nav ${isOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => {navigate("/tasks"); setIsOpen(false);}}>Mis pedidos</li>
          <li onClick={() => {navigate("/tasks/new"); setIsOpen(false);}}>Realizar pedidos</li>
        </ul>
      </div>
    </div>
  );
};

export default VerticalNavigation;
