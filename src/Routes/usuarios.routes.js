import {Router} from 'express';
import {authRequired} from '../middlewares/validateToke.js'; 

import {getUsuarios,
        createUsuario,
        loginUsuario,
        deleteUsuario,
        logout,verifyToken,
        crearCalendarioLiturgico,
        getCalendarioYLapsoUnificado,
        PostReportes,
        getReportes,
        deleteReporte} from '../controllers/usuarios.controller.js';

const router = Router();

router.post('/login', loginUsuario)/* ojo ya esta listo esto  */
router.post('/usuarios', authRequired  , createUsuario);/* comprovacion de token */
router.get('/usuarios', authRequired ,  getUsuarios);/* comprovacion de token */
router.delete('/usuarios/:id', authRequired , deleteUsuario);/* falta implementar la eliminacion de usuario */
router.post('/reportes', PostReportes); /* ruta para recibir los reportes desde el formulario */

router.get('/reportes', authRequired, getReportes); /* ruta para obtener los reportes (protegida) */
router.delete('/reportes/:id', authRequired, deleteReporte); /* ruta para eliminar un reporte (protegida) */

router.post('/logout', logout);
router.post('/verifyToken', verifyToken);

router.post('/crear-calendario', authRequired, crearCalendarioLiturgico); // Nueva ruta para crear calendario
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