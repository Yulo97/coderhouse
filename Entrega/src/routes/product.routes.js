import { Router } from "express";
import * as controllers from "../controllers/product.controllers.js"
import { isAdmin, isPremium } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/', controllers.getProducts)
router.get('/:id', controllers.getProductById)
router.post('/', (req, res, next) => {
   if(req.user && req.user.role === "admin" || req.user.role === "premium") return next()
   res.status(403).json({status: "failure", message: "No tienes acceso"}) 
}, controllers.addProduct)
router.put('/:id', isAdmin , controllers.updateProduct)
router.delete('/:id', isAdmin, controllers.deleteProduct)
router.post('/create/mockingproducts', controllers.generateProduct)

export default router