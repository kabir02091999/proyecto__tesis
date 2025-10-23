import React, { useState, useEffect } from 'react';
import { getBanner, subirBanner } from '../../api/auth';


const styles = {
    // Contenedor principal
    tabContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        marginBottom: '15px', 
        color: '#2c3e50',
        fontSize: '26px', 
        borderBottom: '2px solid #3498db', 
        paddingBottom: '10px',
        fontWeight: '700',
    },
    label: {
        fontSize: '14px',
        color: '#34495e',
        fontWeight: '600',
        marginBottom: '5px',
        marginTop: '10px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px', 
        border: '1px solid #c0c0c0',
        borderRadius: '6px',
        fontSize: '15px',
        boxSizing: 'border-box',
    },
    saveButton: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '12px 30px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '40px',
        alignSelf: 'flex-start',
        boxShadow: '0 6px 15px rgba(52, 152, 219, 0.3)',
        transition: 'background-color 0.2s',
        marginBottom: '2rem',
        fontWeight: '600',
    },
    fileInputContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10px',
        padding: '15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        marginBottom: '15px',
    },
    fileInput: {
        display: 'none',
    },
    fileLabel: {
        backgroundColor: '#95a5a6',
        color: 'white',
        padding: '10px 18px',
        borderRadius: '6px',
        cursor: 'pointer',
        textAlign: 'center',
        marginBottom: '15px', 
        transition: 'background-color 0.2s',
        maxWidth: '250px',
        alignSelf: 'flex-start',
        fontWeight: '600',
    },
    imagePreviewContainer: {
        marginTop: '10px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '300px', // Más grande para un banner
        height: 'auto',
        alignSelf: 'flex-start',
    },
    imagePreview: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
};


const MainConfig = () => {
    const [title, setTitle] = useState('');
    const [bannerFile, setBannerFile] = useState(null);
    const [imgUrl, setimgUrl] = useState(null);

    const showConfirmationMessage = (message, isSuccess = true) => {
        const confirmElement = document.getElementById('confirmation-message');
        if (confirmElement) {
            confirmElement.textContent = message;
            confirmElement.style.display = 'block';
            confirmElement.style.backgroundColor = isSuccess ? '#2ecc71' : '#e74c3c'; // Verde o Rojo
            setTimeout(() => { confirmElement.style.display = 'none'; }, 3000);
        }
    };

    useEffect(() => {
        getBanner()
            .then( ({data}) =>{
                setimgUrl(`${data.imagen}`)

                if (!data.titulo) {
                    setTitle('Seleccione titulo'); 
                } else {
                    setTitle(data.titulo)
                }
            })
            .catch(() => {
                setTitle('Seleccione titulo');
            });
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setBannerFile(file);
            setimgUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('title', title);
        
        if (bannerFile) {
            formData.append('banner-foto', bannerFile, bannerFile.name);
        } 
        
        subirBanner(formData)
            .then(()=>{
                showConfirmationMessage('✅ Configuración guardada exitosamente.', true);
            })
            .catch(error => {
                showConfirmationMessage('❌ Error al guardar la configuración.', false);
            })
    };

    return (
        <div style={styles.tabContent}>
            {/* Div del Popup (ID y estilos copiados del otro componente) */}
            <div id="confirmation-message" style={{
                position: 'fixed', 
                top: '10px', 
                right: '10px', 
                backgroundColor: '#3498db', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '5px', 
                zIndex: 100, 
                display: 'none', 
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}></div>

            <h2 style={styles.title}>Configuración de Título y Banner</h2>
            
            <p style={styles.label}>Título del Banner:</p>
            <input 
                style={styles.input} 
                name="title"
                placeholder="Escribe el título principal del banner" 
                value={title}
                onChange={handleTitleChange}
            />
            
            <div style={styles.fileInputContainer}>
                <p style={{...styles.label, marginTop: '0'}}>Foto del Banner:</p>
                <input
                    type="file"
                    id="banner-file-upload"
                    style={styles.fileInput}
                    onChange={handleFileChange}
                    accept="image/*"
                />
                
                <label 
                    htmlFor="banner-file-upload" 
                    style={styles.fileLabel}
                >
                    Cargar/Cambiar Foto Banner
                </label>
                
                {imgUrl && (
                    <div style={styles.imagePreviewContainer}>
                        <img 
                            src={imgUrl}
                            alt="Vista Previa del Banner" 
                            style={styles.imagePreview} 
                        />
                    </div>
                )}
            </div>

            <button 
                style={styles.saveButton}
                onClick={handleSubmit}
            >
                💾 Guardar Configuración
            </button>
        </div>
    );
};

export default MainConfig;