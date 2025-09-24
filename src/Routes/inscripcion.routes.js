import { Router } from 'express';
import { authRequired } from '../middlewares/validateToke.js';


import { RegistroLapso,GetLapso, getfindPoblacionByID, crearPoblacion ,getfindPoblacionByCI, aprobacion, inscripto,getinscript_CI, getAprobacionByCI_Inner} from '../controllers/inscricion.controller.js';


const router = Router();

router.post('/Registro-Lapso', RegistroLapso)
router.get('/get-lapso', GetLapso) 

router.post('/inscripto', inscripto)//listo
router.get('/inscripto/:ci', getinscript_CI)//listo probar octener lo inscrito


router.post('/crear-poblacion', crearPoblacion)//listo recordar en este est proseso men agregar en la tabla de poblacion , padres , datos_poblacion
router.get('/find-poblacion/:id', getfindPoblacionByID)
router.get('/getfind-poblacion/:CI', getfindPoblacionByCI)///ojojo

router.post('/aprobacion', aprobacion)
router.get('/aprobacion/:ci', getAprobacionByCI_Inner)// este me busca la tabla aprbacion i tre los datos de lapso y incrito

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