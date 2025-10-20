import { Router } from 'express';
import { authRequired } from '../middlewares/validateToke.js';
import { registrarMultiplesTransacciones, GetTransacciones} from '../controllers/finanzas.controller.js';

const router = Router();

router.post('/transacciones',authRequired, registrarMultiplesTransacciones )
router.get('/transacciones', GetTransacciones );

export default router;