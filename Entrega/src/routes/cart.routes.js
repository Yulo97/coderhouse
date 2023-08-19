import { Router } from "express";
import * as controllers from "../controllers/cart.controllers.js"

const router = Router()

router.get('/', controllers.getCarts)
router.get('/:id', controllers.getCartById)
router.post('/', controllers.addCart)
router.put('/:id', controllers.updateCart)
router.put('/:cid/products/:pid', controllers.updateProductOfCart)
router.delete('/:id', controllers.deleteCart)
router.delete('/:cid/products/:pid', controllers.deleteProductOfCart)

export default router
