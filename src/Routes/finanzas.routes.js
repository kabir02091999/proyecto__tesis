import { Router } from 'express';
import { authRequired } from '../middlewares/validateToke.js';
import { registrarMultiplesTransacciones } from '../controllers/finanzas.controller.js';

const router = Router();

router.post('/transacciones', registrarMultiplesTransacciones )

export default router;