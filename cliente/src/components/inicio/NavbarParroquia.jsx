import React from 'react';

// ⚠️ Asegúrate de que estas rutas sean correctas en tu proyecto
import logoUnet from '../../image/unet2.png'; 
import logoParroquia from '../../image/logoParroquia.png'; 

const NAV_BACKGROUND_COLOR = '#F8F9FA'; // Gris Claro Sutil
const TEXT_COLOR = '#001F54'; // Azul Institucional

// Alturas
const LOGO_HEIGHT_PARROQUIA = '85px';     
const LOGO_HEIGHT_UNET = '102px';        


const NavbarParroquia = () => {
    return (
        <nav style={styles.navbar}>
            
            <div style={styles.logoContainer}>
                
                {/* GRUPO DE LOGOS ALINEADO A LA IZQUIERDA */}
                <div style={styles.leftLogoGroup}> 
                    
                    {/* Logo UNET */}
                    <img 
                        src={logoUnet} 
                        alt="Logo UNET" 
                        style={styles.logoUnet} 
                    />

                    {/* Logo Parroquia */}
                    <img 
                        src={logoParroquia} 
                        alt="Logo Parroquia Divino Maestro" 
                        style={styles.logoParroquia} 
                    />
                </div>

                {/* Título Central */}
                <h1 style={styles.title}>
                    Sistema de Gestión Parroquial
                </h1>
                
                {/* ➡️ ESPACIADOR DERECHO: Ajustado a 210px para igualar el ancho de los logos y centrar el título */}
                <div style={styles.spacer} /> 

            </div>

            {/* 2. Enlaces de Navegación */}
            <div style={styles.navLinks}>
                <a href="/inscripcion" style={styles.link}>Inscripción</a>
                <a href="/calendario" style={styles.link}>Calendario</a>
                <a href="/finanzas" style={styles.link}>Finanzas</a>
                <a href="/reportes" style={styles.link}>Reportes</a>
                <a href="/login" style={styles.link}>Login</a>
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
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', 
        borderBottom: `1px solid #dee2e6`, 
    },
    logoContainer: {
        width: '100%',
        maxWidth: '1200px', 
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '10px',
    },
    leftLogoGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px', 
    },
    title: {
        color: TEXT_COLOR,
        fontSize: '1.7em', 
        fontWeight: '700',
        // Aseguramos que el texto esté centrado DENTRO del elemento h1
        textAlign: 'center', 
        // Permite que el título ocupe todo el espacio entre los logos y el espaciador
        flexGrow: 1, 
        // Quitamos margin: 0 auto, ya que flex-grow es suficiente aquí
    },
    // ➡️ AJUSTE CRÍTICO PARA EL CENTRADO ⬅️
    spacer: {
        // Hemos aumentado el ancho para que sea simétrico al grupo de logos de la izquierda.
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
    
    // ENLACES
    navLinks: {
        display: 'flex',
        gap: '30px',
        paddingTop: '5px',
    },
    link: {
        color: TEXT_COLOR,
        textDecoration: 'none',
        fontSize: '1em',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'background-color 0.2s',
    },
};

export default NavbarParroquia;