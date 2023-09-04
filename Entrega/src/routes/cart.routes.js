import { Router } from "express";
import * as cartController from "../controllers/cart.controllers.js"
import * as ticketController from "../controllers/ticket.controllers.js"
import { isUser, isLogin } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/', cartController.getCarts)
router.get('/:id', cartController.getCartById)
router.post('/', isUser, cartController.addCart)
router.put('/:id', cartController.updateCart)
router.put('/:cid/products/:pid', isLogin, cartController.updateProductOfCart)
router.delete('/:id', cartController.deleteCart)
router.delete('/:cid/products/:pid', cartController.deleteProductOfCart)
router.post('/:cid/purchase', ticketController.addTicket)

export default router
