import { Router } from "express";
import * as controllers from "../controllers/views.controllers.js"

const router = Router()

router.get('/chat', controllers.renderChat)
router.get('/realtimeproducts', controllers.renderRealTimeProducts)
router.get('/products', (req, res, next) => {

    if (!req.isAuthenticated()) return res.redirect('/api/views/login');

    if (req.user.role === "admin") return next()

    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: true, message: 'Acceso denegado. No tienes permisos para acceder a esta página.' });
    }

}, controllers.renderProducts)
router.get('/carts/:cid', controllers.getCartById)
router.get('/register', controllers.renderRegister)
router.get('/login', controllers.renderLogin)

export default router