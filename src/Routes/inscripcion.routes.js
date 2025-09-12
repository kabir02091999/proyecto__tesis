import { Router } from 'express';
import { authRequired } from '../middlewares/validateToke.js';

import { RegistroLapso,GetLapso, CrearPoblacionConRegistrosRelacionados, getfindPoblacionByID, crearPoblacion ,getfindPoblacionByCI} from '../controllers/inscricion.controller.js';

const router = Router();

router.post('/Registro-Lapso', RegistroLapso)
router.get('/get-lapso', GetLapso) 


router.post('/crear-poblacion', crearPoblacion)
router.get('/find-poblacion/:id', getfindPoblacionByID)
router.get('/getfind-poblacion/:CI', getfindPoblacionByCI)



export default router;