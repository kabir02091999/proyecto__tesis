import {Router} from 'express';
import {authRequired} from '../middlewares/validateToke.js'; // Assuming you have a middleware for token validation

import {getUsuarios,createUsuario,loginUsuario,deleteUsuario, logout,verifyToken , crearCalendarioLiturgico ,getCalendarioYLapsoUnificado} from '../controllers/usuarios.controller.js';

const router = Router();

router.post('/login', loginUsuario)/* ojo ya esta listo esto  */
router.post('/usuarios', authRequired  , createUsuario);/* comprovacion de token */
router.get('/usuarios', authRequired ,  getUsuarios);/* comprovacion de token */
router.delete('/usuarios/:id', authRequired , deleteUsuario);/* falta implementar la eliminacion de usuario */
router.post('/logout', logout);
router.post('/verifyToken', verifyToken);

router.post('/crear-calendario'/* , authRequired */, crearCalendarioLiturgico); // Nueva ruta para crear calendario
router.get('/calendario',getCalendarioYLapsoUnificado);
// api/crear-calendario

export default router;

/* {
    "nombre":"kabir",
    "apellido":"quiroz",
    "email": "kabir.2@hotmail.com",
    "contrasena":"kabir",
    "tipoUsuario":"financiero"
} */