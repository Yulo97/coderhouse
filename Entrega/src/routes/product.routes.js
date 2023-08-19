import { Router } from "express";
import * as controllers from "../controllers/product.controllers.js"

const router = Router()

router.get('/', controllers.getProducts)
router.get('/:id', controllers.getProductById)
router.post('/', controllers.addProduct)
router.put('/:id', controllers.updateProduct)
router.delete('/:id', controllers.deleteProduct)

export default router