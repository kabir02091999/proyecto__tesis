import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import usuariosRoutes from './Routes/usuarios.routes.js';
import inscripcionRoutes from './Routes/inscripcion.routes.js';
 import finansasRoutes from './Routes/finanzas.routes.js';
import contenidoRoutes from './Routes/contenido.routes.js'; 

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());   
app.use('/api', usuariosRoutes);

app.use('/api/inscripcion', inscripcionRoutes); 
app.use('/api/finanzas', finansasRoutes); 
app.use('/api/contenido', contenidoRoutes); 

export default app;
/*  {

    "email": "kabir.2@hotmail.com",
    "contrasena":"kabir"

 } */