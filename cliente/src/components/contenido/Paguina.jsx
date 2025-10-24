import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getBanner, getHistorias } from '../../api/auth';

// ===========================================
// ✅ 2 VARIABLES CONSTANTES PARA MISIÓN Y VISIÓN
// ===========================================
const MISION_PARROQUIA = 'Ser la voz y el motor del desarrollo comunitario, promoviendo la participación ciudadana, la transparencia y la mejora continua de los servicios. Trabajamos por una parroquia moderna, justa y con un futuro próspero para todos sus habitantes.';
const VISION_PARROQUIA = 'Consolidar a nuestra parroquia como un modelo de gestión local y bienestar social, donde cada ciudadano se sienta valorado y tenga acceso a oportunidades de crecimiento integral, manteniendo un fuerte sentido de identidad y patrimonio cultural.';
// ===========================================

const STORIES_TO_SHOW = 3; 
const CARD_WIDTH_PLUS_GAP = 300 + 25; 

const styles = {
    // ... (Mantengo los estilos originales)
    appContainer: {
        fontFamily: 'Roboto, Arial, sans-serif',
        margin: 0,
        padding: 0,
        backgroundColor: '#f7f7f7',
    },
    siteHeader: {
        backgroundColor: '#004d99', // Azul Parroquia
        color: 'white',
        padding: '15px 20px',
        textAlign: 'center',
        fontSize: '1.8em',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    mainContent: {
        paddingTop: 0,
    },
    siteFooter: {
        backgroundColor: '#333',
        color: '#ccc',
        textAlign: 'center',
        padding: '20px 0',
        marginTop: '50px',
        fontSize: '0.9em',
    },
    mainBanner: {
        position: 'relative',
        width: '100%',
        height: '450px',
        overflow: 'hidden',
        marginBottom: '40px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'brightness(0.65)',
    },
    bannerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 10,
    },
    bannerTitle: {
        color: 'white',
        fontSize: '3.2em',
        padding: '20px 40px',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        borderRadius: '10px',
        fontWeight: '900',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
        margin: 0,
    },
    loadingMessage: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '1.2em',
        color: '#666',
    },
    // ✅ NUEVO ESTILO: Contenedor para Misión y Visión
    misionVisionSection: {
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto 50px auto',
        display: 'flex',
        gap: '40px',
        justifyContent: 'space-around',
        backgroundColor: 'white', // Fondo blanco para destacarlo
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
        borderLeft: '8px solid #004d99', // Detalle azul institucional
    },
    // ✅ NUEVO ESTILO: Contenido individual de Misión/Visión
    misionVisionCard: {
        flex: 1,
        padding: '20px',
        textAlign: 'center',
    },
    // ✅ NUEVO ESTILO: Título de Misión/Visión
    misionVisionTitle: {
        color: '#004d99',
        fontSize: '1.8em',
        marginBottom: '15px',
        position: 'relative',
        paddingBottom: '10px',
    },
    // ✅ NUEVO ESTILO: Separador bajo el título
    titleSeparator: {
        content: '""',
        display: 'block',
        width: '50px',
        height: '3px',
        backgroundColor: '#ff9900', // Color de contraste (Naranja/Oro)
        margin: '0 auto',
        marginTop: '10px',
    },
    // ✅ NUEVO ESTILO: Párrafo de Misión/Visión
    misionVisionText: {
        fontSize: '1.1em',
        color: '#333',
        lineHeight: '1.6',
    },
    
    historiasSection: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto 50px auto',
        position: 'relative', 
    },
    sectionTitle: {
        textAlign: 'center',
        color: '#004d99',
        marginBottom: '30px',
        fontSize: '2.2em',
        fontWeight: 'bold',
        paddingBottom: '10px',
    },
    carruselContainer: { 
        position: 'relative',
        padding: '0 50px', 
    },
    carruselHistorias: {
    display: 'flex',
    overflowX: 'auto',  // Permite scroll táctil
    gap: '25px',
    padding: '15px',
    scrollBehavior: 'smooth',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    WebkitOverflowScrolling: 'touch',
},
    historiaCard: {
        minWidth: '300px',
        maxWidth: '300px',
        flex: '0 0 auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        border: '1px solid #eee',
    },
    historiaImagen: {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
    },
    historiaContenido: {
        padding: '15px',
    },
    historiaTitulo: {
        color: '#004d99',
        marginTop: 0,
        fontSize: '1.3em',
        marginBottom: '10px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',   
    },
    historiaTexto: {
        fontSize: '0.9em',
        lineHeight: '1.4',
        color: '#666',
        margin: 0,
        maxHeight: '4.2em', 
        overflow: 'hidden',
    },
    carruselButton: {
        position: 'absolute',
        top: '50%', 
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 77, 153, 0.95)', 
        color: 'white',
        border: '2px solid white', 
        borderRadius: '50%',
        width: '50px', 
        height: '50px', 
        fontSize: '2em', 
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 20,
        transition: 'background-color 0.3s, transform 0.3s, border-color 0.3s',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        // El hover se maneja directamente con la sintaxis de `style` en JSX en el renderizado.
    },
    prevButton: {
        left: '0px', 
    },
    nextButton: {
        right: '0px', 
    },
    buttonDisabled: {
        backgroundColor: 'rgba(0, 77, 153, 0.4)', 
        borderColor: 'rgba(255, 255, 255, 0.5)',
        cursor: 'not-allowed',
        boxShadow: 'none',
        transform: 'translateY(-50%)', 
    },
    dotsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    dot: {
        height: '10px',
        width: '10px',
        margin: '0 5px',
        backgroundColor: '#bbb',
        borderRadius: '50%',
        display: 'inline-block',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    dotActive: {
        backgroundColor: '#004d99',
    },
};

const Paguina = () => {
    const carruselRef = useRef(null); 
    const [currentSlide, setCurrentSlide] = useState(0); 
    const [storiesToShow, setStoriesToShow] = useState(STORIES_TO_SHOW);
    const [bannerData, setBannerData] = useState({ imagen: '', titulo: 'Cargando Contenido...' });
    const [historias, setHistorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const totalSlides = Math.ceil(historias.length / storiesToShow);

    
    // ... (Lógica de scroll, handleNext, handlePrev - SE MANTIENE IGUAL)
    const scrollToSlide = (index) => {
       if (!carruselRef.current) return;
    
    const cardWidth = carruselRef.current.firstChild
        ? carruselRef.current.firstChild.offsetWidth + 25 // 25px gap
        : 325;

    carruselRef.current.scrollTo({
        left: index * cardWidth * storiesToShow,
        behavior: 'smooth'
    });

    setCurrentSlide(index);
    };

    const handleNext = () => {
        const nextSlide = currentSlide + 1;
        if (nextSlide < totalSlides) {
            scrollToSlide(nextSlide);
        }
    };

    const handlePrev = () => {
        const prevSlide = currentSlide - 1;
        if (prevSlide >= 0) {
            scrollToSlide(prevSlide);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_BASE_URL = 'http://localhost:3000'; 
                
                // Las llamadas a la API se mantienen igual
                const {data:historias} = await getHistorias()
                const {data:banner} = await getBanner()

                setBannerData(banner);

                const historiasConURL = historias.map(historia => ({
                    ...historia,
                    // Se asume que historia.foto ya es una URL completa si no se necesita el prefijo
                    // Si se necesita el prefijo, mantén la línea original:
                    foto: `${API_BASE_URL}/archivos/${historia.foto}` 
                }));

                setHistorias(historiasConURL.sort((a, b) => (a.indice || 0) - (b.indice || 0)));
                setLoading(false);
            } catch (err) {
                console.error("Error al obtener datos:", err);
                setError("Lo sentimos, no pudimos cargar el contenido de la parroquia.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 480) {
      setStoriesToShow(1);
    } else if (window.innerWidth < 768) {
      setStoriesToShow(2);
    } else {
      setStoriesToShow(3);
    }
  };

  handleResize(); // Ejecuta al montar
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

    if (loading) {
        return (
            <div style={styles.appContainer}>
                <p style={styles.loadingMessage}>Cargando todo el contenido...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.appContainer}>
                <p style={{ ...styles.loadingMessage, color: 'red' }}>{error}</p>
            </div>
        );
    }

    const getStoryImageUrl = (filename) => {
        // Esta función se mantiene, asumiendo que es un fallback
        return `http://localhost:3000/archivos/placeholder-story.png`;
    };

    return (
        <div style={styles.appContainer}>
            <main style={styles.mainContent}>
                {/* 1. SECCIÓN PRINCIPAL DEL BANNER */}
                <section style={styles.mainBanner}>
                    <img 
                        src={bannerData.imagen} 
                        alt={bannerData.titulo || 'Banner Parroquia'} 
                        style={styles.bannerImage}
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = getStoryImageUrl(null); 
                        }}
                    />
                    <div style={styles.bannerOverlay}>
                        <h1 style={styles.bannerTitle}>{bannerData.titulo || '¡Bienvenido!'}</h1>
                    </div>
                </section>

                {/* 2. ✅ NUEVA SECCIÓN: MISIÓN Y VISIÓN */}
                <section style={styles.misionVisionSection}>
                    {/* Tarjeta de Misión */}
                    <div style={styles.misionVisionCard}>
                        <h2 style={styles.misionVisionTitle}>
                            Misión
                            <span style={styles.titleSeparator}></span>
                        </h2>
                        <p style={styles.misionVisionText}>{MISION_PARROQUIA}</p>
                    </div>

                    {/* Tarjeta de Visión */}
                    <div style={styles.misionVisionCard}>
                        <h2 style={styles.misionVisionTitle}>
                            Visión
                            <span style={styles.titleSeparator}></span>
                        </h2>
                        <p style={styles.misionVisionText}>{VISION_PARROQUIA}</p>
                    </div>
                </section>

                {/* 3. SECCIÓN DE HISTORIAS Y ACONTECIMIENTOS */}
                <section style={styles.historiasSection}>
                    <h2 style={styles.sectionTitle}>Nuestras Historias y Acontecimientos</h2>
                    
                    <div style={styles.carruselContainer}>
                        {/* Botón Anterior */}
                        <button
                            style={{ 
                                ...styles.carruselButton, 
                                ...styles.prevButton, 
                                ...(currentSlide === 0 && styles.buttonDisabled) 
                            }}
                            onClick={handlePrev}
                            disabled={currentSlide === 0}
                            aria-label="Historia Anterior"
                        >
                            {'<'}
                        </button>

                        {/* Contenedor del Carrusel con Referencia */}
                        <div 
                            ref={carruselRef} 
                            style={styles.carruselHistorias}
                        >
                            {historias.length > 0 ? (
                                historias.map((historia) => (
                                    <div
                                        key={historia.indice || historia.id_contenido_historia}
                                        style={styles.historiaCard}
                                    >
                                        <img 
                                            src={historia.foto} 
                                            alt={historia.titulo} 
                                            style={styles.historiaImagen}
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = getStoryImageUrl(null); 
                                            }}
                                        />
                                        <div style={styles.historiaContenido}>
                                            <h3 style={styles.historiaTitulo}>{historia.titulo}</h3>
                                            <p style={styles.historiaTexto}>{historia.contenido}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={styles.loadingMessage}>No hay historias disponibles en este momento.</p>
                            )}
                        </div>
                        
                        {/* Botón Siguiente */}
                        <button
                            style={{ 
                                ...styles.carruselButton, 
                                ...styles.nextButton, 
                                // Ajuste la condición para deshabilitar correctamente el botón siguiente
                                ...(currentSlide >= totalSlides - 1 || historias.length <= STORIES_TO_SHOW) && styles.buttonDisabled
                            }}
                            onClick={handleNext}
                            disabled={currentSlide >= totalSlides - 1 || historias.length <= STORIES_TO_SHOW}
                            aria-label="Historia Siguiente"
                        >
                            {'>'}
                        </button>
                    </div>

                    {/* Indicadores de Posición (Dots/Slider Visibles) */}
                    {historias.length > STORIES_TO_SHOW && (
                        <div style={styles.dotsContainer}>
                            {Array.from({ length: totalSlides }, (_, index) => (
                                <span
                                    key={index}
                                    style={{
                                        ...styles.dot,
                                        ...(index === currentSlide ? styles.dotActive : {})
                                    }}
                                    onClick={() => scrollToSlide(index)}
                                    aria-label={`Ir a la página ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}

                </section>

            </main>

            <footer style={styles.siteFooter}>
                <p>&copy; {new Date().getFullYear()} Parroquia Digital. Contenido administrable desde el backend.</p>
            </footer>
        </div>
    );
};

export default Paguina;