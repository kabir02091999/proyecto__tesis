import { Router } from 'express';
import { authRequired } from '../middlewares/validateToke.js';
import { registrarMultiplesTransacciones, GetTransacciones , obtenerTransaccionesPorPeriodo} from '../controllers/finanzas.controller.js';

const router = Router();

router.post('/transacciones',authRequired, registrarMultiplesTransacciones )
router.get('/transacciones', GetTransacciones );
router.get('/transacciones/periodo', obtenerTransaccionesPorPeriodo );

export default router;