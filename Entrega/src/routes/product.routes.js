import { Router } from "express";
import * as productControllers from "../controllers/product.controllers.js"

const router = Router()

router.get('/', productControllers.getProducts)
router.get('/:id', productControllers.getProductById)
router.post('/', productControllers.addProduct)
router.put('/:id', productControllers.updateProduct)
router.delete('/:id', productControllers.deleteProduct)

export default router