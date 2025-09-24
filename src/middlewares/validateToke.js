import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, autorización denegada' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No se pudo extraer el token' });
    }
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error('Error al verificar el token:', err);
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }   
        req.user = user;
        next();
    });
};

/* import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import Usuario from '../models/usuario.model.js';

// ... otras funciones de tu controlador ...

export const verifyToken = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        
        // Verificamos si el encabezado de autorización existe y tiene el formato correcto.
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token not found after Bearer' });
        }

        // Verificamos el token con el TOKEN_SECRET
        const user = jwt.verify(token, TOKEN_SECRET);

        // Si el token es válido, buscamos el usuario en la base de datos
        const userFound = await Usuario.findById(user.id);
        
        if (!userFound) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Devolvemos el usuario verificado.
        return res.json({ user: userFound });

    } catch (error) {
        console.error('Error in verifyToken controller:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}; */