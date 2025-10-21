import React, { useState } from 'react';
import axios from 'axios';

import { subirarArchivo } from '../../api/auth';

const Archivo = () => {
  const [file, setFile] = useState(null);
  const [favColor, setFavColor] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleColorChange = (e) => {
    setFavColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('foto', file);
    formData.append('favoriteColor', favColor);
    axios.post('http://localhost:3000/api/contenido/archivo',formData)
        .then(()=>console.log('ni un solo movimiento'))
  };

  return (
    <div>
      <h1>Upload Component ⬆</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fotoInput">
            The Foto:
          </label>
          <input
            id="fotoInput"
            type="file"
            onChange={handleFileChange}
            name="foto"
          />
        </div>

        <div>
          <label htmlFor="colorInput">
            Favore Color:
          </label>
          <input
            id="colorInput"
            type="text"
            value={favColor}
            onChange={handleColorChange}
            placeholder="e.g., Meme Green"
          />
        </div>

        <button type="submit">
          upload
        </button>
      </form>
    </div>
  );
};

export default Archivo;