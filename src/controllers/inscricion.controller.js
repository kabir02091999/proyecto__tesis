import { pool } from "../db/db.js";
import bcrypt from "bcryptjs";
import { crateToken } from "../libs/jwt.js";

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
        const [rows] = await pool.query('SELECT * FROM lapso');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los lapsos' });
    }
}


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
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Población no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la población' });
    }
};

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

export const CrearPoblacionConRegistrosRelacionados = async (req, res) => {
    const { poblacionData, padresData, inscripcionData } = req.body;

    let connection;

    try {
        // --- Validaciones iniciales ---
        // Validación para 'poblacion' sigue igual
        if (!poblacionData || !poblacionData.nombre || !poblacionData.apellidos || !poblacionData.ci || !poblacionData.tipoPoblacion) {
            return res.status(400).json({ message: "Datos de población incompletos. Se requieren: nombre, apellidos, ci, tipoPoblacion." });
        }

        // VALIDACIÓN DE INSCRIPCION CORREGIDA:
        // Ahora fecha_nacimiento es obligatorio en inscripcion, no en poblacionData (si es su único lugar)
        if (inscripcionData && (!inscripcionData.instituto || !inscripcionData.grado || !inscripcionData.turno || !inscripcionData.fecha_nacimiento)) {
            return res.status(400).json({ message: "Datos de inscripción incompletos. Se requieren: instituto, grado, turno, fecha_nacimiento." });
        }

        // Validación de padres sigue igual
        if (padresData && (!padresData.N_M && !padresData.N_P)) {
            return res.status(400).json({ message: "Datos de padres incompletos. Se requiere al menos el nombre de la madre o el padre." });
        }

        connection = await pool.getConnection();
        await connection.beginTransaction();

        // --- 3. Insertar en la tabla 'poblacion' ---
        // NOTA: Si los campos de nacimiento/direccion NO van en poblacion, quítalos del INSERT de poblacion.
        // Asumiendo que poblacion solo tiene 'nombre', 'apellidos', 'ci', 'tipoPoblacion'
        const [poblacionResult] = await connection.query(
            `INSERT INTO poblacion (nombre, apellidos, ci, tipoPoblacion)
             VALUES (?, ?, ?, ?)`, // QUITADOS lugar_nacimiento, fecha_nacimiento, direccion_habitacion
            [
                poblacionData.nombre,
                poblacionData.apellidos,
                poblacionData.ci,
                poblacionData.tipoPoblacion
            ]
        );
        const insertedPoblacionCI = poblacionData.ci;

        // --- 4. Insertar en la tabla 'inscripcion' (CORREGIDO) ---
        if (inscripcionData) {
            const [inscripcionResult] = await connection.query(
                `INSERT INTO inscripcion (ci, lugar_nacimiento, fecha_nacimiento, lugar_bautizo, fecha_bautizo, direccion_habitacion, instituto, grado, turno)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    insertedPoblacionCI, // CI del estudiante
                    inscripcionData.lugar_nacimiento || null, // ¡Ahora de inscripcionData!
                    inscripcionData.fecha_nacimiento,        // ¡Ahora de inscripcionData! (NOT NULL)
                    inscripcionData.lugar_bautizo || null,   // ¡Ahora de inscripcionData!
                    inscripcionData.fecha_bautizo || null,   // ¡Ahora de inscripcionData!
                    inscripcionData.direccion_habitacion || null, // ¡Ahora de inscripcionData!
                    inscripcionData.instituto,
                    inscripcionData.grado,
                    inscripcionData.turno
                ]
            );
            console.log("Datos de inscripción insertados con ID:", inscripcionResult.insertId);
        }

        // --- 5. Insertar en la tabla 'padres' (sigue igual) ---
        // ... (el código de padresData sigue siendo el mismo) ...
        if (padresData) {
            const [padresResult] = await connection.query(
                `INSERT INTO padres (ci, N_M, ci_M, NR_M, ocupacion_M, N_P, ci_P, NR_P, ocupacion_P, casados, Pareja_echo, viven_junto, NR_Her, edad)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    insertedPoblacionCI, // CI del hijo/a, FK a 'poblacion'
                    padresData.N_M || null,
                    padresData.ci_M || null,
                    padresData.NR_M || null,
                    padresData.ocupacion_M || null,
                    padresData.N_P || null,
                    padresData.ci_P || null,
                    padresData.NR_P || null,
                    padresData.ocupacion_P || null,
                    padresData.casados || 'no',
                    padresData.Pareja_echo !== undefined ? padresData.Pareja_echo : null,
                    padresData.viven_junto !== undefined ? padresData.viven_junto : null,
                    padresData.NR_Her || null,
                    padresData.edad || null
                ]
            );
            console.log("Datos de padres insertados con ID:", padresResult.insertId);
        }


        // ... (Commit, response, catch, finally siguen igual) ...

    } catch (error) {
        // ... (manejo de errores sigue igual) ...
    } finally {
        if (connection) {
            connection.release();
        }
    }
};