export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // Usuario es administrador, permitir acceso
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