import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getBanner, getHistorias } from '../../api/auth';
import { AseAuth } from '../../context/AuthContext';
import EventCalendario from '../../components/calendario';
import { FaInstagram } from 'react-icons/fa'; // Importación del ícono de Instagram

const MISION_PARROQUIA = 'Ser la voz y el motor del desarrollo comunitario, promoviendo la participación ciudadana, la transparencia y la mejora continua de los servicios. Trabajamos por una parroquia moderna, justa y con un futuro próspero para todos sus habitantes.';
const VISION_PARROQUIA = 'Consolidar a nuestra parroquia como un modelo de gestión local y bienestar social, donde cada ciudadano se sienta valorado y tenga acceso a oportunidades de crecimiento integral, manteniendo un fuerte sentido de identidad y patrimonio cultural.';

const STORIES_TO_SHOW = 3;

const styles = {
  appContainer: {
    fontFamily: 'Roboto, Arial, sans-serif',
    margin: 0,
    padding: 0,
    backgroundColor: '#f7f7f7',
  },
  siteHeader: {
    backgroundColor: '#004d99',
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
    // Asegura que los elementos en el footer estén centrados si se añade más contenido
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  misionVisionSection: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto 50px auto',
    display: 'flex',
    gap: '40px',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
    borderLeft: '8px solid #004d99',
  },
  misionVisionCard: {
    flex: 1,
    padding: '20px',
    textAlign: 'center',
  },
  misionVisionTitle: {
    color: '#004d99',
    fontSize: '1.8em',
    marginBottom: '15px',
    position: 'relative',
    paddingBottom: '10px',
  },
  titleSeparator: {
    content: '""',
    display: 'block',
    width: '50px',
    height: '3px',
    backgroundColor: '#ff9900',
    margin: '0 auto',
    marginTop: '10px',
  },
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
    overflowX: 'auto',
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
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Añadida transición para el hover
    cursor: 'pointer',
    border: '1px solid #eee',
  },
  // Nuevo estilo para el efecto de crecer/elevar al pasar el ratón
  historiaCardHover: {
    transform: 'scale(1.03)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
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
    maxHeight: '4.2em', // Mantenemos una altura máxima visible por defecto
    overflow: 'hidden',
    transition: 'max-height 0.5s ease-out, white-space 0.5s ease-out', // Añadir transición
    whiteSpace: 'normal', // Permitir saltos de línea normales
  },historiaTextoCompleto: {
    maxHeight: '300px', // Un valor grande para asegurar que se vea todo el texto
    whiteSpace: 'normal', 
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
  const [hoveredCardId, setHoveredCardId] = useState(null); // Estado para manejar el hover
  const [bannerData, setBannerData] = useState({ imagen: '', titulo: 'Cargando Contenido...' });
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const totalSlides = Math.ceil(historias.length / storiesToShow);
  const { calendario, Getcalendario } = AseAuth();

  const scrollToSlide = (index) => {
    if (!carruselRef.current) return;
    const cardWidth = carruselRef.current.firstChild ? carruselRef.current.firstChild.offsetWidth + 25 : 325;
    carruselRef.current.scrollTo({ left: index * cardWidth * storiesToShow, behavior: 'smooth' });
    setCurrentSlide(index);
  };

  const handleNext = () => {
    const nextSlide = currentSlide + 1;
    if (nextSlide < totalSlides) scrollToSlide(nextSlide);
  };

  const handlePrev = () => {
    const prevSlide = currentSlide - 1;
    if (prevSlide >= 0) scrollToSlide(prevSlide);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = 'http://localhost:3000';
        const { data: historias } = await getHistorias();
        const { data: banner } = await getBanner();
        setBannerData(banner);
        const historiasConURL = historias.map(historia => ({
          ...historia,
          foto: `${API_BASE_URL}/archivos/${historia.foto}`,
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
      if (window.innerWidth < 480) setStoriesToShow(1);
      else if (window.innerWidth < 768) setStoriesToShow(2);
      else setStoriesToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    Getcalendario();
  }, []);

  if (loading) return <div style={styles.appContainer}><p style={styles.loadingMessage}>Cargando todo el contenido...</p></div>;
  if (error) return <div style={styles.appContainer}><p style={{ ...styles.loadingMessage, color: 'red' }}>{error}</p></div>;

  const getStoryImageUrl = () => 'http://localhost:3000/archivos/placeholder-story.png';

  return (
    <div style={{ ...styles.appContainer, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, ...styles.mainContent }}>
        <section style={styles.mainBanner}>
          <img src={bannerData.imagen} alt={bannerData.titulo || 'Banner Parroquia'} style={styles.bannerImage} onError={(e) => { e.target.src = getStoryImageUrl(null); }} />
          <div style={styles.bannerOverlay}>
            <h1 style={styles.bannerTitle}>{bannerData.titulo || '¡Bienvenido!'}</h1>
          </div>
        </section>

        <section style={styles.misionVisionSection}>
          <div style={styles.misionVisionCard}>
            <h2 style={styles.misionVisionTitle}>Misión<span style={styles.titleSeparator}></span></h2>
            <p style={styles.misionVisionText}>{MISION_PARROQUIA}</p>
          </div>
          <div style={styles.misionVisionCard}>
            <h2 style={styles.misionVisionTitle}>Visión<span style={styles.titleSeparator}></span></h2>
            <p style={styles.misionVisionText}>{VISION_PARROQUIA}</p>
          </div>
        </section>

        <section style={styles.historiasSection}>
          <h2 style={styles.sectionTitle}>Nuestras Historias y Acontecimientos</h2>
          <div style={styles.carruselContainer}>
            <button style={{ ...styles.carruselButton, ...styles.prevButton, ...(currentSlide === 0 && styles.buttonDisabled) }} onClick={handlePrev} disabled={currentSlide === 0}>{'<'}</button>
            <div ref={carruselRef} style={styles.carruselHistorias}>
              {historias.length > 0 ? (
                historias.map((historia) => {
                  const id = historia.indice || historia.id_contenido_historia;
                  const isHovered = hoveredCardId === id;
                  const cardStyle = {
                    ...styles.historiaCard,
                    ...(isHovered ? styles.historiaCardHover : {}),
                  };

                  return (
                    <div 
                      key={id} 
                      style={cardStyle}
                      onMouseEnter={() => setHoveredCardId(id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                    >
                      <img src={historia.foto} alt={historia.titulo} style={styles.historiaImagen} onError={(e) => { e.target.src = getStoryImageUrl(null); }} />
                      <div style={styles.historiaContenido}>
                        <h3 style={styles.historiaTitulo}>{historia.titulo}</h3>
                        {/* LÓGICA CORREGIDA AQUÍ: */}
                        <p style={{
                            ...styles.historiaTexto,
                            ...(isHovered ? styles.historiaTextoCompleto : {})
                        }}>
                          {historia.contenido}
                        </p>
                        {/* FIN LÓGICA CORREGIDA */}
                      </div>
                  </div>
                  );
                })
              ) : (
                <p style={styles.loadingMessage}>No hay historias disponibles en este momento.</p>
              )}
            </div>
            <button style={{ ...styles.carruselButton, ...styles.nextButton, ...(currentSlide >= totalSlides - 1 || historias.length <= STORIES_TO_SHOW) && styles.buttonDisabled }} onClick={handleNext} disabled={currentSlide >= totalSlides - 1 || historias.length <= STORIES_TO_SHOW}>{'>'}</button>
          </div>
          {historias.length > STORIES_TO_SHOW && (
            <div style={styles.dotsContainer}>
              {Array.from({ length: totalSlides }, (_, index) => (
                <span key={index} style={{ ...styles.dot, ...(index === currentSlide ? styles.dotActive : {}) }} onClick={() => scrollToSlide(index)} />
              ))}
            </div>
          )}
        </section>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: "white",
            marginTop: "50px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            width: "100%",
            height: "auto",
            maxWidth: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <EventCalendario calendario={calendario} />
          </div>
        </div>
      </main>

      <footer style={styles.siteFooter}>
        {/* Implementación del ícono FaInstagram y corrección del enlace <a> */}
        <a
          href="https://www.instagram.com/divino_maestro_unet/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'white', // Color blanco para el enlace para que contraste con el footer negro
            textDecoration: 'none',
            fontSize: '1.2em', // Tamaño del texto del enlace
            display: 'flex', // Permite alinear el ícono y el texto
            alignItems: 'center',
            marginBottom: '10px' // Separación del párrafo inferior
          }}
        >
          <FaInstagram style={{ fontSize: '1.5em', marginRight: '8px' }} />
          <span>Divino Maestro UNET síganos</span>
        </a>
        <p>&copy; {new Date().getFullYear()} Parroquia Digital. Contenido administrable.</p>
      </footer>
    </div>
  );
};

export default Paguina;
