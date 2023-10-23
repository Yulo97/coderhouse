import { userServices } from "../services/index.js"
import { logger } from "../utils/logger.js"


export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // Usuario es administrador, permitir acceso
    } else {
        res.status(403).json({ message: 'Acceso no autorizado' });
    }
};

export const isPremium = (req, res, next) => {
    if (req.user && req.user.role === 'premium') {
        next(); // Usuario es usuario regular, permitir acceso
    } else {
        res.status(403).json({ message: 'Acceso no autorizado' });
    }
};

export const isUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
        next(); // Usuario es usuario regular, permitir acceso
    } else {
        res.status(403).json({ message: 'Acceso no autorizado' });
    }
};

export const isLogin = (req, res, next) => {
    if (req.user) {
        next(); // Usuario autenticado, permitir acceso
    } else {
        res.redirect('/api/views/login');
    }
};

export const lastConnection = async (req, res, next) => {
    if(req.user) {
        try {
            await userServices.update(req.user._id, {last_connection: Date.now()})
        } catch (error) {
            logger.error("Error al actualizar 'last_connection'");
        }
    }
    next()
}