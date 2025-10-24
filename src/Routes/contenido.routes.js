import { Router } from 'express';
import { authRequired } from '../middlewares/validateToke.js';
import upload from '../Multer.js';
import { pool } from '../db/db.js';



import { fileURLToPath } from 'url';
import fs from 'fs/promises'
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const UPLOAD_DIR = path.join(__filename, '..', '..', '..', 'archivos');

const file_url = `http://localhost:3000/archivos`


const router = Router();

router.post('/archivo', upload.single("foto"), (req, res) => {
    res.send('Aquí se manejará la subida de archivos.');
});

router.get('/historias', async (req, res) => {
    const [results] = await pool.query('select * from contenido_historia')

    res.json(results)
})

router.get('/main-banner', async (req, res) => {
    const [img] = await pool.query("select * from contenido_imagen where nombre = 'banner'")
    const [texto] = await pool.query("select * from contenido_texto where nombre = 'banner'")

    res.json({
        imagen: img[0]?.path ? `${file_url}/${img[0]?.path}` : `${file_url}/placeholder.png`,
        titulo: texto[0]?.texto,
    })
})


router.post('/main-banner', upload.single("banner-foto"), async (req, res) => {

    // si se sube una imagen implica que se quiere cambiar la imagen

    let query;
    if (req.file) {

        try {
            const allFiles = await fs.readdir(UPLOAD_DIR);
            for (const fileName of allFiles) {
                if (fileName !== req.file.filename && fileName.startsWith('banner-foto')) {
                    await fs.unlink(path.join(UPLOAD_DIR, fileName))
                }
            }
        } catch (error) {
        }

        query = `
            delete from contenido_imagen where nombre = 'banner'
        `
        await pool.query(query)
        query = `
            INSERT INTO contenido_imagen (nombre, path) VALUES
            ('banner', ?);
        `
        await pool.query(query, req?.file?.filename)

    }


    query = `delete from contenido_texto where nombre = 'banner'  `
    await pool.query(query)

    query = `
        INSERT INTO contenido_texto (nombre, texto) VALUES
        ('banner', ?);
    `

    await pool.query(query, req.body.title)


    res.status(201).end()
})

router.post('/historias', upload.any(), async (req, res) => {

    let query = 'DELETE from contenido_historia'
    await pool.query(query)

    let filenames = []

    for (const historia of req.body.historia) {
        const indice = parseInt(historia.index)
        query = 'select * from contenido_historia where indice = ?'
        const foto = req.files.find((f) => f.fieldname === `historia[${indice}][image]`)



        // se asume que de una u manera path sera llenado 
        // el frontend garantiza eso
        let path = null
        if (foto) {
            path = foto.filename
        } else {
            path = historia.image_url
        }

        filenames = [...filenames, path]

        query = `
            INSERT INTO contenido_historia 
            (indice, titulo, contenido, foto)
            VALUES ( ? , ? ,? ,? );
        `



        await pool.query(query, [
            indice,
            historia.title,
            historia.content,
            path
        ])

    }

    await cleanupObsoleteFiles(filenames)



    res.status(200).end();
});

async function cleanupObsoleteFiles(filesToKeep) {
    try {
        const allFiles = await fs.readdir(UPLOAD_DIR);

        const deletionPromises = [];
        const historyFilePattern = /^historia\[\d+\]\[image\].*/;
        const fileNamesToKeep = new Set(filesToKeep.map(p => path.basename(p)));
        for (const fileName of allFiles) {
            if (historyFilePattern.test(fileName)) {
                if (!fileNamesToKeep.has(fileName)) {
                    const serverFilePath = path.join(UPLOAD_DIR, fileName);
                    deletionPromises.push(fs.unlink(serverFilePath));
                }
            }
        }
        await Promise.all(deletionPromises);
    } catch (error) {
        console.log(error)
    }
}

export default router;
