import { Router } from 'express';
import { authRequired } from '../middlewares/validateToke.js';

import { RegistroLapso,GetLapso, CrearPoblacionConRegistrosRelacionados, getfindPoblacionByID, crearPoblacion ,getfindPoblacionByCI, aprobacion} from '../controllers/inscricion.controller.js';

const router = Router();

router.post('/Registro-Lapso', RegistroLapso)
router.get('/get-lapso', GetLapso) 


router.post('/crear-poblacion', crearPoblacion)//listo
router.get('/find-poblacion/:id', getfindPoblacionByID)
router.get('/getfind-poblacion/:CI', getfindPoblacionByCI)

router.post('/aprobacion', aprobacion)
//para la crear-poblacion
 /* {
        "nombre": "Pedro",
        "apellidos": "Gómez",
        "tipoPoblacion": "profesor",
        "ci": "27643185",
        "padres":{

            "N_M": "María Antonia Pérez",
            "ci_M": "98765432",
            "NR_M": "04121112233",
            "ocupacion_M": "Abogada",
            "N_P": "Juan Carlos González",
            "ci_P": "12345678",
            "NR_P": "04144445566",
            "ocupacion_P": "Ingeniero",
            "casados": "iglesia",
            "Pareja_echo": true,
            "viven_junto": true,
            "NR_Her": 2,
            "edad": 45

        },
        "datos_poblacion":{
        
            "lugar_nacimiento": "Caracas",
            "fecha_nacimiento": "1990-05-15",
            "lugar_bautizo": "Iglesia San Francisco",
            "fecha_bautizo": "1990-08-20",
            "direccion_habitacion": "Av. Principal #123, El Rosal",
            "instituto": "Colegio San José",
            "grado": "5to año",
            "turno": "mañana"

    }
} */

export default router;