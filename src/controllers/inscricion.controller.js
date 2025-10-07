import { pool } from "../db/db.js";
import bcrypt from "bcryptjs";
import { crateToken } from "../libs/jwt.js";


async function crear_plobacion_aux(datos, padres,datos_poblacion) {
    const { nombre, apellidos, tipoPoblacion, ci, } = datos
    if (!nombre || !apellidos || !tipoPoblacion || !ci) {
        return { status: 400, mensaje: 'datos incompletos' }
    }

    const [existing] = await pool.query('SELECT id FROM poblacion WHERE ci = ?', [ci]);
    if (existing.length > 0) {
        return { status: 409, ok: false, mensaje: 'la cedula ya esta siendo utilizada para este estudiante' }
    }
 
    const tipo = tipoPoblacion.toLowerCase()
    if (tipo != 'estudiante' && tipo != 'profesor') {
        return { ok: false, mensaje: 'tipo de poblacion erroneo', status: 400 }
    }

    const [result] = await pool.query(
        'INSERT INTO poblacion (nombre, apellidos, tipoPoblacion, ci) VALUES (?, ?, ?, ?)',
        [nombre, apellidos, tipoPoblacion, ci]
    );
    
    
    if(padres){
        const resultadoPadres = await crear_padres_aux(padres, ci);
        if (!resultadoPadres.ok) {        
            return { status: resultadoPadres.status, ok: false, mensaje: resultadoPadres.mensaje }
        }
    }if(datos_poblacion){
        const resultadoDatosPoblacion = await crear_datos_poblacion_aux(datos.datos_poblacion, ci);
        if (!resultadoDatosPoblacion.ok) {        
            return { status: resultadoDatosPoblacion.status, ok: false, mensaje: resultadoDatosPoblacion.mensaje }
        }
    }
 
    console.log("bien")
    return {
        ok: true,
        mensaje: 'poblacion creada existosmanete',
        payload: {
            id: result.insertId,
            nombre,
            apellidos,
            tipoPoblacion,
            ci,
            padres:{...padres}
        }
    }
}

const crear_padres_aux = async (datos, ci_hijo) => {
    if (!datos) {
        return { ok: true, mensaje: 'no hay datos de padres para crear', status: 200 }
    }
    const { N_M, ci_M, NR_M, ocupacion_M,
        N_P, ci_P, NR_P, ocupacion_P,
        casados, Pareja_echo, viven_junto, NR_Her, edad
    } = datos;
    if (!N_M && !N_P) {
        return { status: 400, ok: false, mensaje: 'datos incompletos' }
    }
    await pool.query(
        `INSERT INTO padres (ci, N_M, ci_M, NR_M, ocupacion_M, N_P, ci_P, NR_P, ocupacion_P, casados, Pareja_echo, viven_junto, NR_Her, edad)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            ci_hijo, // CI del hijo/a, FK a 'poblacion'
            N_M || null,
            ci_M || null,
            NR_M || null,
            ocupacion_M || null,
            N_P || null,
            ci_P || null,
            NR_P || null,
            ocupacion_P || null,
            casados || 'no',
            Pareja_echo !== undefined ? Pareja_echo : null,
            viven_junto !== undefined ? viven_junto : null,
            NR_Her || null,
            edad || null
        ]
    );
    return { ok: true, mensaje: 'padres creados existosamente', status: 201 }
}

const crear_datos_poblacion_aux = async (datos,ci_hijo) => { 
    const { lugar_nacimiento, fecha_nacimiento, lugar_bautizo, fecha_bautizo, direccion_habitacion, instituto, grado, turno } = datos;
    if (!ci_hijo || !lugar_nacimiento || !fecha_nacimiento || !direccion_habitacion) {
        return { ok: false, mensaje: 'datos adicionales de población incompletos', status: 400 };
    }

    try {
        await pool.query(
            `INSERT INTO datospoblacion (
                ci, lugar_nacimiento, fecha_nacimiento, lugar_bautizo, fecha_bautizo,
                direccion_habitacion, instituto, grado, turno
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                ci_hijo,
                lugar_nacimiento,
                fecha_nacimiento,
                lugar_bautizo || null,
                fecha_bautizo || null,
                direccion_habitacion,
                instituto || null,
                grado || null,
                turno || null
            ]
        );
        return { ok: true, mensaje: 'datos de población adicionales creados exitosamente', status: 201 };
    } catch (error) {
        console.error('Error al crear los datos adicionales de población:', error);
        return { ok: false, mensaje: 'Error al crear los datos adicionales de población', status: 500 };
    }}

export const crearPoblacion = async (req, res) => {
    try {
        const resultado = await crear_plobacion_aux(req.body, req.body.padres, req.body.datos_poblacion); 
       
        if (!resultado.ok) {
            return res.status(resultado.status).json({ message: resultado.mensaje });
        }
        
        return res.status(201).json({ message: resultado.mensaje, data: resultado.payload });

    } catch (error) {
        console.error('Error inesperado en crearPoblacion:', error);
        return res.status(500).json({ message: 'Error inesperado en el servidor' });
    }
}

export const getfindPoblacionByCI = async (req, res) => {
    const { CI } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM poblacion WHERE ci = ?', [CI]);
        const [rows2] = await pool.query('SELECT * FROM padres WHERE ci = ?', [CI]);
        const [rows3] = await pool.query('SELECT * FROM datospoblacion WHERE ci = ?', [CI]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Población no encontrada' });
        }
        if (rows2.length === 0) {
            return res.status(404).json({ message: 'Padres no encontrados' });
        }
        if (rows3.length === 0) {
            return res.status(404).json({ message: 'Datos de población no encontrados' });
        }
            const resultado = { ...rows[0], padres: rows2[0], datos_poblacion: rows3[0] };
            return res.status(200).json(resultado);
        //res.json(rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la población' });
    }
};


/* export const getfindPoblacionByCI = async (req, res) => {
    const { CI } = req.params;
    
    try {
        // 1. Consultas a la base de datos
        const [rows] = await pool.query('SELECT * FROM poblacion WHERE ci = ?', [CI]);
        const [rows2] = await pool.query('SELECT * FROM padres WHERE ci = ?', [CI]);
        const [rows3] = await pool.query('SELECT * FROM datospoblacion WHERE ci = ?', [CI]);

        // 2. VERIFICACIÓN CRÍTICA (Población Principal)
        // Si el registro principal (poblacion) no existe, devolvemos 404 y terminamos.
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Población con CI no registrada.' });
        }

        // 3. COMBINACIÓN DE DATOS (Adjuntar lo que esté disponible)
        
        // rows2 y rows3 pueden ser arrays vacíos (length === 0) si no hay datos.
        // Usamos [0] para obtener el objeto o 'undefined' si el array está vacío.
        const datosPadres = rows2.length > 0 ? rows2[0] : null;
        const datosSecundarios = rows3.length > 0 ? rows3[0] : null;

        const resultado = {
            ...rows[0],                     // Datos principales (siempre existen aquí)
            padres: datosPadres,            // Objeto de padres o null
            datos_poblacion: datosSecundarios // Objeto de datos secundarios o null
        };
        
        // 4. ÉXITO
        // Devolvemos 200 OK con el objeto combinado, incluso si 'padres' o 'datos_poblacion' son null.
        return res.status(200).json(resultado);

    } catch (error) {
        console.error("Error en la DB:", error);
        res.status(500).json({ message: 'Error al obtener la población' });
    }
}; */

// request para verificar si entidad población existe por id 
export const getfindPoblacionByID = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM poblacion WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Población no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la población' });
    }
};

/* recordar que la fecha estan mmmm/mm/dd*/
export const RegistroLapso = async (req, res) => {
    const { inicio, fin, tipo_inscripcion } = req.body;
    console.log(req.body)
    if (!inicio || !fin || !tipo_inscripcion) {
        console.log("inicio " + inicio)
        console.log("fin " + fin)
        console.log("tipo_inscripcion " + tipo_inscripcion)
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const [result] = await pool.query('INSERT INTO lapso (inicio, fin, tipo_inscripcion) VALUES (?, ?, ?)', [inicio, fin, tipo_inscripcion]);
        res.status(201).json({ id: result.insertId, inicio, fin, tipo_inscripcion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el lapso' });
    }
}

/* TipoDeLapso */
export const GetLapso = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM lapso ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los lapsos' });
    }
}

export const aprobacion = async (req, res) => {
    const {ci,id_lapso,aprovacion}= req.body;
    if (!ci || !id_lapso || !aprovacion) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    try {
        const [existing] = await pool.query('SELECT ID_lapso FROM aprobacion WHERE CI = ? AND ID_lapso = ?', [ci, id_lapso]);
        if (existing.length > 0) {
            return res.status(409).json({ message: 'Ya existe una aprobación para este CI y lapso' });
        }

        const [result] = await pool.query('INSERT INTO aprobacion (CI,ID_lapso, aprobado_Reprobado) VALUES (?, ?, ?)', [ci, id_lapso, aprovacion]);
        res.status(201).json({ id: result.insertId, ci, id_lapso, aprovacion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la aprobación' });
    }
}

export const getAprobacionByCI_Inner = async (req, res) => {
    const { ci } = req.params;
    try {
        const [rows] = await pool.query('SELECT inicio , aprobado_Reprobado , seccion , nivel FROM inscrito INNER JOIN lapso ON inscrito.ID_lapso = lapso.ID INNER JOIN aprobacion ON lapso.ID = aprobacion.aprobado_Reprobado  WHERE inscrito.CI = ? ', [ci]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Aprobación no encontrada' });
        }
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la aprobación' });
    }
}

export const inscripto = async (req, res) => {

    const {ID_lapso,CI,seccion,nivel} = req.body;
    if (!ID_lapso || !CI || !seccion || !nivel) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    try {
        const [existing] = await pool.query('SELECT ID_lapso FROM inscrito WHERE CI = ? AND ID_lapso = ?', [CI, ID_lapso]);
        if (existing.length > 0) {
            return res.status(409).json({ message: 'Ya existe una inscrito  para este CI y lapso' });
        }
        const [result] = await pool.query('INSERT INTO inscrito (ID_lapso,CI,seccion,nivel) VALUES (?, ?, ?, ?)', [ID_lapso, CI, seccion, nivel]);
        res.status(201).json({ id: result.insertId, ID_lapso, CI, seccion, nivel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la inscripción' });
    }

}

export const getinscript_CI = async (req, res) => {
    const { ci } = req.params;
    console.log("ci "+ci)   
    try {
        const [rows] = await pool.query('SELECT * FROM inscrito WHERE CI = ?', [ci]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Inscripción no encontrada' });
        }
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la inscripción' });
    }
}
