import { Router } from "express";
import * as controllers from "../controllers/cart.controllers.js"
import { isUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/', controllers.getCarts)
router.get('/:id', controllers.getCartById)
router.post('/', isUser, controllers.addCart)
router.put('/:id', controllers.updateCart)
router.put('/:cid/products/:pid', isUser, controllers.updateProductOfCart)
router.delete('/:id', controllers.deleteCart)
router.delete('/:cid/products/:pid', controllers.deleteProductOfCart)
router.post('/cid:/purchase', controllers.purchase)

export default router
