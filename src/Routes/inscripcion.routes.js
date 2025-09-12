import { Router } from 'express';
import { authRequired } from '../middlewares/validateToke.js';

import { RegistroLapso, CrearPoblacionConRegistrosRelacionados, getfindPoblacionByID, crearPoblacion } from '../controllers/inscricion.controller.js';

const router = Router();

router.post('/Registro-Lapso', RegistroLapso)
router.post('/crear-poblacion', crearPoblacion)
router.get('/find-poblacion', getfindPoblacionByID)


export default router;