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

export const verifyToken = async (req, res) => {
    // extraer el token del post body
    const { token } = req.body;
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

})}