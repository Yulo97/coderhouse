import { Router } from "express";
import * as controllers from "../controllers/views.controllers.js"
import { isLogin, isUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/chat', isUser, controllers.renderChat)
router.get('/realtimeproducts', isLogin, controllers.renderRealTimeProducts)
router.get('/products', isLogin, controllers.renderProducts)
router.get('/carts/:cid', isLogin, controllers.getCartById)
router.get('/register', controllers.renderRegister)
router.get('/login', controllers.renderLogin)
router.get('/restore-password', controllers.renderRestorePassword)
router.get('/restore-password/:token', controllers.renderRestorePassword2)

export default router