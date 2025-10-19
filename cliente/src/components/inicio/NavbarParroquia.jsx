import React from 'react';

// ⚠️ Asegúrate de que estas rutas sean correctas en tu proyecto
import logoUnet from '../../image/unet2.png'; 
import logoParroquia from '../../image/logoParroquia.png'; 

// Colores
const NAV_BACKGROUND_COLOR = '#F8F9FA'; // Gris Claro Sutil
const TEXT_COLOR = '#001F54'; // Azul Institucional (Navy)
const ACCENT_COLOR = '#3f51b5'; // Azul un poco más claro para el hover

// Alturas (manteniendo las alturas calculadas)
const LOGO_HEIGHT_PARROQUIA = '85px';     
const LOGO_HEIGHT_UNET = '102px';        


const NavbarParroquia = () => {
    // Definimos el estado para manejar el hover en los enlaces
    const [hoveredLink, setHoveredLink] = React.useState(null);

    // Función para obtener el estilo de un enlace, incluyendo el efecto hover
    const getLinkStyle = (name) => ({
        ...styles.link,
        // Aplica el estilo de hover si el enlace actual es el que tiene el mouse encima
        ...(hoveredLink === name && styles.linkHover) 
    });

    return (
        <nav style={styles.navbar}>
            
            <div style={styles.logoContainer}>
                
                {/* 1. GRUPO DE LOGOS ALINEADO A LA IZQUIERDA */}
                <div style={styles.leftLogoGroup}> 
                    <img 
                        src={logoUnet} 
                        alt="Logo UNET" 
                        style={styles.logoUnet} 
                    />
                    <img 
                        src={logoParroquia} 
                        alt="Logo Parroquia Divino Maestro" 
                        style={styles.logoParroquia} 
                    />
                </div>

                {/* 2. Título Central */}
                <h1 style={styles.title}>
                    Parroquia Divino Maestro
                </h1>
                
                {/* 3. ESPACIADOR DERECHO */}
                <div style={styles.spacer} /> 
            </div>

            {/* 4. Línea de Separación bajo el Título */}
            <div style={styles.separator} />

            {/* 5. Enlaces de Navegación */}
            <div style={styles.navLinks}>
                
                {/* Nota: Usamos onMouseEnter/Leave para simular el :hover en CSS-in-JS */}
                <a 
                    href="/inscripcion" 
                    style={getLinkStyle('inscripcion')} 
                    onMouseEnter={() => setHoveredLink('inscripcion')}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    Inscripción
                </a>
                
                <a 
                    href="/reportes" 
                    style={getLinkStyle('reportes')}
                    onMouseEnter={() => setHoveredLink('reportes')}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    Reportes
                </a>
                <a 
                    href="/login" 
                    style={getLinkStyle('login')}
                    onMouseEnter={() => setHoveredLink('login')}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    Login
                </a>
                <a 
                    href="/" 
                    style={getLinkStyle('inicio')}
                    onMouseEnter={() => setHoveredLink('inicio')}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    Inicio
                </a>
            </div>

        </nav>
    );
};

// 💅 Estilos CSS en JavaScript (JS-in-CSS)
const styles = {
    navbar: {
        backgroundColor: NAV_BACKGROUND_COLOR, 
        padding: '10px 20px',
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        // Sombra más elegante
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', 
    },
    logoContainer: {
        width: '100%',
        maxWidth: '1200px', 
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems: 'center',
        // Reducimos el margen inferior, ya que la línea separadora se encargará
        marginBottom: '0', 
    },
    leftLogoGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '25px', // Un poco más de espacio entre logos
    },
    title: {
        color: TEXT_COLOR,
        // Fuente más grande y negrita para hacerlo más dominante
        fontSize: '2.0em', 
        fontWeight: '800', // Súper Negrita
        fontFamily: 'Segoe UI, Roboto, Arial, sans-serif', // Fuente moderna
        textAlign: 'center', 
        flexGrow: 1, 
        // Eliminamos el margen superior/inferior para que se alinee mejor
        margin: '0', 
    },
    spacer: {
        // Mantenemos el espaciador para el centrado
        minWidth: '210px', 
    },
    
    // TAMAÑOS DE LOGO
    logoUnet: {
        height: LOGO_HEIGHT_UNET, 
        width: 'auto',
    },
    logoParroquia: {
        height: LOGO_HEIGHT_PARROQUIA, 
        width: 'auto',
    },
    
    // ⬇️ NUEVO ESTILO: Separador entre Título y Enlaces
    separator: {
        width: '100%',
        maxWidth: '1200px',
        height: '3px',
        backgroundColor: TEXT_COLOR, // Línea en azul institucional
        margin: '10px 0',
    },

    // ⬇️ ESTILOS DE ENLACES MEJORADOS
    navLinks: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        gap: '15px', // Menos espacio para más enlaces
        padding: '5px 0 10px 0', // Espaciado vertical
        justifyContent: 'flex-end', // Alineamos los enlaces a la derecha
    },
    link: {
        color: TEXT_COLOR,
        textDecoration: 'none',
        fontSize: '1em',
        fontWeight: '600',
        padding: '5px 12px',
        borderRadius: '20px', // Forma de píldora
        transition: 'all 0.3s ease',
        fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
    },
    linkHover: {
        // Efecto hover sutil
        backgroundColor: ACCENT_COLOR, 
        color: '#FFFFFF', // Texto blanco al pasar el mouse
        transform: 'translateY(-1px)', // Ligero efecto 3D
    }
};

export default NavbarParroquia;