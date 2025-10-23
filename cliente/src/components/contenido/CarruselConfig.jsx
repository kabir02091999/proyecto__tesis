import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import api, { getHistorias, subirHistorias } from '../../api/auth';


const styles = {
  // Contenedor principal
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    // Eliminamos el height: '100%' para que fluya bien con el scroll del contenedor principal
  },
  title: {
    marginBottom: '15px', // Espacio reducido
    color: '#2c3e50',
    fontSize: '26px', // Ligeramente más grande
    borderBottom: '2px solid #3498db', // Línea más prominente
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
    marginBottom: '15px', // Espacio consistente
    border: '1px solid #c0c0c0',
    borderRadius: '6px',
    fontSize: '15px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    // Simulación de estilo :focus
    ':focus': {
      borderColor: '#3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)',
    }
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px', // Espacio consistente
    border: '1px solid #c0c0c0',
    borderRadius: '6px',
    fontSize: '15px',
    minHeight: '100px', 
    resize: 'vertical',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    // Simulación de estilo :focus
    ':focus': {
      borderColor: '#3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)',
    }
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
    transition: 'background-color 0.2s, box-shadow 0.2s, transform 0.1s',
    marginBottom: '2rem',
    fontWeight: '600',
    ':hover': {
      backgroundColor: '#2980b9',
      transform: 'translateY(-1px)'
    }
  },
  // ---------------------------------------------
  // ESTILOS DEL DISEÑO DE LISTA PLANA (CARD)
  // ---------------------------------------------
  storyItemContainer: {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '25px',
    marginBottom: '30px', // Mayor separación entre tarjetas para claridad
    backgroundColor: '#fcfcfc',
    position: 'relative', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Sombra más definida
    transition: 'box-shadow 0.3s',
    // ':hover': {
    //  boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
    // }
  },
  storyHeader: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#34495e',
    marginBottom: '20px',
    paddingRight: '100px', // Deja espacio para el botón de eliminar
  },
  removeButtonFlat: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#e74c3c', 
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s, box-shadow 0.2s',
    zIndex: 10,
    fontWeight: '600',
    ':hover': {
      backgroundColor: '#c0392b',
    }
  },
  addButtonGlobal: {
    backgroundColor: '#2ecc71', 
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s, box-shadow 0.2s',
    alignSelf: 'flex-start',
    marginBottom: '30px', 
    boxShadow: '0 4px 10px rgba(46, 204, 113, 0.3)',
    fontWeight: '600',
    ':hover': {
      backgroundColor: '#27ae60',
      transform: 'translateY(-1px)'
    }
  },
  fileInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    padding: '15px', // Más relleno interno
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
    ':hover': {
      backgroundColor: '#7f8c8d',
    }
  },
  imagePreviewContainer: {
    marginTop: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '200px', // Imagen más pequeña para un diseño compacto
    height: 'auto',
    alignSelf: 'flex-start',
  },
  imagePreview: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
};



const StoryItem = ({
    story,
    index,
    handleTextChange,
    handleFileChange,
    removeStory,
    totalStories
}) => {
  const fileInputRef = useRef(null);

  let img = null;

  if (story.image) {
    img = story.imageUrl
  } else {
    img = `http://localhost:3000/archivos/${story.foto}`
  }




  return (
    <div style={styles.storyItemContainer}>
      <h3 style={styles.storyHeader}>Historia del Carrusel #{index + 1}</h3>

      {totalStories > 1 && (
        <button 
          style={styles.removeButtonFlat}
          onClick={() => removeStory(index)}
        >
          🗑️ Eliminar
        </button>
      )}

      <p style={styles.label}>Título:</p>
      <input 
        style={styles.input} 
        name="titulo"
        placeholder="Escribe el título de la historia aquí" 
        value={story.titulo}
        onChange={(e) => handleTextChange(index, e.target.name, e.target.value)}
      />
      
      {/* Campo: Contenido */}
      <p style={styles.label}>Contenido/Descripción:</p>
      <textarea 
        style={styles.textarea} 
        name="contenido"
        placeholder="Escribe el contenido de la historia aquí"
        value={story.contenido}
        onChange={(e) => handleTextChange(index, e.target.name, e.target.value)}
      />

      <div style={styles.fileInputContainer}>
        <p style={{...styles.label, marginTop: '0'}}>Foto del Carrusel:</p>
        <input
          type="file"
          id={`file-upload-${story.id}`} // Usar un ID único
          ref={fileInputRef}
          style={styles.fileInput}
          onChange={(e) => handleFileChange(index, e)}
          accept="image/*"
        />
        
        <label 
          htmlFor={`file-upload-${story.id}`} 
          style={styles.fileLabel}
        >
          Cargar/Cambiar Foto
        </label>
        
        {
            story.foto ? (
            <div style={styles.imagePreviewContainer}>
                <img 
                    src={img}
                    alt="Vista Previa" 
                    style={styles.imagePreview} 
                />
            </div>
            ) :
            <div style={styles.imagePreviewContainer}>
                <img 
                    src='http://localhost:3000/archivos/placeholder.png' 
                    alt="Vista Previa" 
                    style={styles.imagePreview} 
                />
            </div>
        }
      </div>
    </div>
  );
};


const CarruselConfig = () => {
  const [stories, setStories] = useState([]);
  
  useEffect(()=>{
    getHistorias()
        .then( ({data})=> {
            const sorted = data.sort( (a,b) => a.indice - b.indice)
            if (sorted.length === 0) {
                setStories([{
                    titulo: 'Titulo 1',
                    contenido: '',
                    foto:null
                }]) 
            } else {
                setStories(sorted)
            }
        })
  },[])
  
  const handleTextChange = (index, name, value) => {
    setStories(prevStories => 
      prevStories.map( (story,i) => 
        i === index ? { ...story, [name]: value } : story
      )
    );
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];

    if (file) {
      setStories(prevStories => 
        prevStories.map( (story,i) => {
            console.log(story,i,index)
            return index === i
              ? { 
                  ...story, 
                  image: file, 
                  foto:URL.createObjectURL(file), /// muy cansado para arreglar esto
                  imageUrl:  URL.createObjectURL(file)
                } 
              : story
            }
        )
      );
    }
  };

  const addStory = () => {
    const newId = stories.length;
    const newStory = {
      id: newId,
      title: `Nueva Historia `,
      content: 'Este es el contenido de la nueva historia del carrusel, listo para ser editado.',
      image: null,
    };
    
    setStories([...stories, newStory]);
  };

  const removeStory = (index) => {
    if (stories.length <= 1) {

      const confirmElement = document.getElementById('confirmation-message');
      if (confirmElement) {
        confirmElement.textContent = '❌ Error: Debe haber al menos una historia.';
        confirmElement.style.display = 'block';
        setTimeout(() => { confirmElement.style.display = 'none'; }, 3000);
      }
      return;
    }
    
    setStories(prevStories => prevStories.filter(( story,i) => i !== index));
  };
  
  const handleSubmit = () => {
    const formData = new FormData();
    stories.forEach((story, index) => {
      formData.append(`historia[${index}][index]`, index);
      formData.append(`historia[${index}][title]`, story.titulo);
      formData.append(`historia[${index}][content]`, story.contenido);
      
      if (story.image instanceof File) {
        formData.append(`historia[${index}][image]`, story.image, story.image.name);
      } else {
        formData.append(`historia[${index}][image_url]`, story.foto || 'none'); 
      }
    });

    subirHistorias(formData).then( () => {
        const confirmElement = document.getElementById('confirmation-message');
        if (confirmElement) {
          confirmElement.textContent = `✅ ${stories.length} historias guardadas (revisa la consola para el FormData).`;
          confirmElement.style.display = 'block';
          confirmElement.style.backgroundColor = '#2ecc71';
          setTimeout(() => { confirmElement.style.display = 'none'; }, 3000);
        }
    })

  };

  return (
    <div style={styles.tabContent}>
      <h2 style={styles.title}>Gestión del Carrusel de Historias</h2>
      
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

      <button 
        style={styles.addButtonGlobal}
        onClick={addStory}
      >
        ➕ Añadir Nueva Historia
      </button>
      
      {stories.map((story, index) => (
        <StoryItem 
          key={story.id} 
          story={story} 
          index={index}
          totalStories={stories.length}
          handleTextChange={handleTextChange}
          handleFileChange={handleFileChange}
          removeStory={removeStory}
        />
      ))}

      <button 
        style={styles.saveButton}
        onClick={handleSubmit}
      >
        💾 Guardar Configuración ({stories.length} Items)
      </button>
    </div>
  );
};

export default CarruselConfig;