import { Router } from "express";
import * as cartController from "../controllers/cart.controllers.js"

const router = Router()

router.get('/', cartController.getCarts)
router.get('/:id', cartController.getCartById)
router.post('/', cartController.addCart)
router.put('/:id', cartController.updateCart)
router.put('/:cid/products/:pid', cartController.updateProductOfCart)
router.delete('/:id', cartController.deleteCart)
router.delete('/:cid/products/:pid', cartController.deleteProductOfCart)

export default router
