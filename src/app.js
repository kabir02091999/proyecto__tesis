import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import usuariosRoutes from './Routes/usuarios.routes.js';
import inscripcionRoutes from './Routes/inscripcion.routes.js'; // Assuming you have inscripcionRoutes defined

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());   
app.use('/api', usuariosRoutes);
app.use('/api/inscripcion', inscripcionRoutes); // Assuming you have inscripcionRoutes defined

export default app;

/* { 
    "email": "kabir.11@gmail.com",
    "password":"hola7"
        
} */