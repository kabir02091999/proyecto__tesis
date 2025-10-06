import React from "react";

import '../css/inscri.css';

import Nav_Inscricion from "../components/inscricion/Nav_Inscricion";
import CrearPoblacion from "../components/CrearPoblacion";

function crear_poblacion() {
  return (
    <div className="admin-layout">
        
        <Nav_Inscricion/>
        <CrearPoblacion/>

    </div>
  )
}   
export default crear_poblacion