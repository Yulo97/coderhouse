import { Router } from "express";
import * as controllers from "../controllers/product.controllers.js"
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/', controllers.getProducts)
router.get('/:id', controllers.getProductById)
router.post('/', isAdmin, controllers.addProduct)
router.put('/:id', isAdmin, controllers.updateProduct)
router.delete('/:id', isAdmin, controllers.deleteProduct)
router.post('/create/mockingproducts', controllers.generateProduct)

export default router