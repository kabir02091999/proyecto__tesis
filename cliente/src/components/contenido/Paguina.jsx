import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getBanner, getHistorias } from '../../api/auth';

const STORIES_TO_SHOW = 3; 
const CARD_WIDTH_PLUS_GAP = 300 + 25; 

const styles = {
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
        padding: '0 50px', // Añadimos padding para que las flechas no queden pegadas
    },
    carruselHistorias: {
        display: 'flex',
        overflowX: 'hidden', 
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
    // Estilos de los botones del Carrusel - MODIFICADOS PARA QUE SE VEAN MÁS
    carruselButton: {
        position: 'absolute',
        top: '50%', 
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 77, 153, 0.95)', // Un poco menos transparente
        color: 'white',
        border: '2px solid white', // Borde blanco para mayor visibilidad
        borderRadius: '50%',
        width: '50px', // Tamaño más grande
        height: '50px', // Tamaño más grande
        fontSize: '2em', // Icono más grande
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 20,
        transition: 'background-color 0.3s, transform 0.3s, border-color 0.3s',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)', // Sombra más pronunciada
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        // Hover effect
        '&:hover': {
            backgroundColor: '#003366', // Un azul más oscuro al pasar el ratón
            transform: 'translateY(-50%) scale(1.05)', // Pequeño efecto de escala
        }
    },
    prevButton: {
        left: '0px', // Posición ajustada para que quepa en el padding del contenedor
    },
    nextButton: {
        right: '0px', // Posición ajustada
    },
    buttonDisabled: {
        backgroundColor: 'rgba(0, 77, 153, 0.4)', // Color atenuado cuando está deshabilitado
        borderColor: 'rgba(255, 255, 255, 0.5)',
        cursor: 'not-allowed',
        boxShadow: 'none',
        transform: 'translateY(-50%)', // No hay efecto de escala cuando está deshabilitado
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

    const [bannerData, setBannerData] = useState({ imagen: '', titulo: 'Cargando Contenido...' });
    const [historias, setHistorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const totalSlides = Math.ceil(historias.length / STORIES_TO_SHOW);
    
    const scrollToSlide = (index) => {
        if (!carruselRef.current) return;

        const scrollPosition = index * CARD_WIDTH_PLUS_GAP; 
        
        carruselRef.current.scrollTo({
            left: scrollPosition * STORIES_TO_SHOW, 
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
                
                const {data:historias} = await getHistorias()
                const {data:banner} = await getBanner()

                setBannerData(banner);

                const historiasConURL = historias.map(historia => ({
                    ...historia,
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
        return `http://localhost:3000/archivos/placeholder-story.png`;
    };

    return (
        <div style={styles.appContainer}>
            <header style={styles.siteHeader}>
                Parroquia Digital
            </header>
            <main style={styles.mainContent}>
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
                                ...(currentSlide >= totalSlides - 1 && styles.buttonDisabled) 
                            }}
                            onClick={handleNext}
                            disabled={currentSlide >= totalSlides - 1}
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