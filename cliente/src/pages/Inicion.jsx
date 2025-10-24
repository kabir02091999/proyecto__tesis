import react, { useEffect } from 'react';
import NavbarParroquia from '../components/inicio/NavbarParroquia.jsx';
import Paguina from '../components/contenido/Paguina.jsx';

function Inicion() {
  
  useEffect(() => {
    //borrar el localstorage al cargar la pagina
    localStorage.clear();
  }, []);

  return (
    <div>
      
      <NavbarParroquia/>
      <Paguina/>

    </div>
  )
}

export default Inicion