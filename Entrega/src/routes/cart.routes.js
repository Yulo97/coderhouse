import { Router } from "express";
import * as cartController from "../controllers/cart.controllers.js"

const router = Router()

router.get('/', cartController.getCarts)
router.get('/:id', cartController.getCartById)
router.post('/', cartController.addCart)
router.put('/:id', cartController.updateCart)
router.delete('/:id', cartController.deleteCart)

export default router
