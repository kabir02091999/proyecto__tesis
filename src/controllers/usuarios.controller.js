import {pool} from '../db/db.js';
import bcrypt from 'bcryptjs';
import {crateToken} from '../libs/jwt.js'
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

/* ojo ya esto desecita la contraseña ojo falta los token */
export const loginUsuario = async (req, res) => {
    const {email, contrasena} = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        const usuario = rows[0];
        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isMatch) {
            return res.status(401).json({message: 'Contraseña incorrecta'});
        }
        
        const token = await crateToken({ userId: usuario.id });

        //res.cookie('token', token);
        res.json({id: usuario.id, nombre: usuario.nombre, apellido: usuario.apellido, email: usuario.email, tipoUsuario: usuario.tipoUsuario, token:token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al iniciar sesión'});
    }
}

export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener los usuarios'});
    }
}
//ojo aqui con la inseccion 
export const createUsuario = async (req, res) => {  
    const {nombre, apellido , email, contrasena,tipoUsuario } = req.body;
    try {
        const newUserContrasena = await bcrypt.hash(contrasena, 10)
        const [result] = await pool.query('INSERT INTO usuarios (nombre, apellido, email, contrasena, tipoUsuario) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, email, newUserContrasena, tipoUsuario]);
        res.status(201).json({id: result.insertId, nombre, apellido, email, tipoUsuario});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al crear el usuario'});
    }
}

export const deleteUsuario = async (req, res) => {
    const {id} = req.params;
    try {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        res.json({message: 'Usuario eliminado correctamente'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al eliminar el usuario'});
    }
}

export const logout =  (req, res) => {

    res.cookie('token', '', {
        expires : new Date(0)
    });

    return res.sendStatus(200);
};

//export const verifyToken = async (req, res) => {
    // extraer el token del post header



    /* const { token } = req.body;
    console.log("verificando token: "+ token)
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }



    jwt.verify(token, TOKEN_SECRET , async (err, decoded) => {
        
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }else{
            console.log(decoded.userId)
            // pool.query('SELECT * FROM usuarios WHERE id = ?', [decoded.userId]);
            const [rows, fields] = await pool.execute('SELECT * FROM usuarios WHERE id = ?', [decoded.userId]);
            const [user] = rows

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            console.log("usuario " + JSON.stringify(user))
            console.log("token "+ token)
            
            return res.status(200).json({ message: 'Token is valid', user: user,  });


        }

}) }*/

export const verifyToken = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];

        // 1. Verificar si el encabezado existe y tiene el formato "Bearer "
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, autorización denegada' });
        }

        // 2. Extraer el token del encabezado
        const token = authHeader.split(' ')[1];
        
        console.log("verificando token: " + token);

        if (!token) {
            return res.status(401).json({ message: 'No se pudo extraer el token' });
        }

        // 3. Usamos una promesa para envolver la verificación del JWT
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });

        console.log("Token decodificado:", decoded);
        const [rows] = await pool.execute('SELECT * FROM usuarios WHERE id = ?', [decoded.userId]);
        const [user] = rows;

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        console.log("Usuario encontrado:", JSON.stringify(user));
        return res.status(200).json({ message: 'Token es válido', user });

    } catch (error) {
        console.error('Error en el controlador verifyToken:', error);
        // Si hay un error, el token es inválido o ha expirado.
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const crearCalendarioLiturgico = async (req, res) => {
    // Yo espero un array de eventos: [{fecha: 'YYYY-MM-DD', evento: 'Nombre'}, ...]
    const eventos = req.body; 
    if (!Array.isArray(eventos) || eventos.length === 0) {
        return res.status(400).json({ message: 'Yo espero un array de uno o más eventos.' });
    }
    // 2. Yo preparo los datos para la inserción múltiple
    const values = eventos.map(e => {
        // Yo valido que cada objeto tenga 'fecha' y 'evento'
        if (!e.fecha || !e.evento) {
            // Yo lanzo un error para que sea capturado por el bloque catch
            throw new Error("Yo necesito que cada evento tenga 'fecha' y 'evento'.");
        }
        return [e.fecha, e.evento];
    });
    
    let connection;
    try {
        // 3. Yo inicio una conexión y una transacción
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const sqlQuery = `
            INSERT INTO calendario_liturgico (fecha, evento) 
            VALUES ?
        `;
        
        // Yo ejecuto la inserción múltiple
        const [result] = await connection.query(sqlQuery, [values]);

        // Yo confirmo la transacción
        await connection.commit();

        // 4. Yo devuelvo una respuesta de éxito
        return res.status(201).json({ 
            message: `Yo inserté con éxito ${result.affectedRows} evento(s) en el calendario.`,
            insertedIds: result.insertId 
        });

    } catch (error) {
        // Si algo falla, yo revierto los cambios
        if (connection) {
            await connection.rollback();
        }
        
        console.error('Error al insertar eventos en el calendario:', error);
        
        // Yo manejo el error de validación que lancé antes
        const status = error.message.includes('necesito') ? 400 : 500;

        return res.status(status).json({ 
            message: 'Yo tuve un error al procesar la inserción.',
            error: error.message
        });
    } finally {
        // Yo libero la conexión al pool
        if (connection) {
            connection.release();
        }
    }
};


export const getCalendarioYLapsoUnificado = async (req, res) => {
    
    try {
        // 1. Obtener todos los LAPSOS
        const [lapsos] = await pool.query('SELECT inicio, fin, tipo_inscripcion FROM lapso');

        // 2. Obtener todos los EVENTOS LITÚRGICOS
        const [eventosLiturgicos] = await pool.query('SELECT fecha, evento FROM calendario_liturgico');
        
        // 3. Transformar los lapsos en eventos de Inicio/Fin
        const lapsosComoEventos = [];
        
        lapsos.forEach(lapso => {
            // Evento de INICIO del lapso
            lapsosComoEventos.push({
                fecha: lapso.inicio,
                evento: `Inicio de ${lapso.tipo_inscripcion}` 
            });

            // Evento de FIN del lapso
            lapsosComoEventos.push({
                fecha: lapso.fin,
                evento: `Fin de ${lapso.tipo_inscripcion}`
            });
        });
        
        // 4. Unir todos los arrays
        let todasLasFechas = [
            ...eventosLiturgicos,
            ...lapsosComoEventos
        ];

        // 5. Ordenar por fecha (esto asegura la cronología)
        todasLasFechas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));


        // Enviar la respuesta exitosa (200 OK)
        return res.status(200).json(todasLasFechas);

    } catch (error) {
        // Manejo de error
        console.error('Error al obtener el calendario y lapsos unificados:', error);
        
        return res.status(500).json({ 
            message: 'Error al obtener el calendario y lapsos unificados',
            error: error.message
        });
    }
};    