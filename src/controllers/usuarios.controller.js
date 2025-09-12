import {pool} from '../db/db.js';
import bcrypt from 'bcryptjs';
import {crateToken} from '../libs/jwt.js'

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
        
        const token = await crateToken({ id: usuario.id });

        res.cookie('token', token);
        res.json({id: usuario.id, nombre: usuario.nombre, apellido: usuario.apellido, email: usuario.email, tipoUsuario: usuario.tipoUsuario});
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