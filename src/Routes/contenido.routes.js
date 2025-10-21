import { Router } from 'express';
import { authRequired } from '../middlewares/validateToke.js';
import upload from '../Multer.js';

const router = Router();

router.post('/archivo',upload.single("foto"), (req, res) => {
    console.log(req.file)
    console.log(req.body.favoriteColor)
    res.send('Aquí se manejará la subida de archivos.');
});

export default router;
