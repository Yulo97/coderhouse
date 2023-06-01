import { Router } from "express";
import { CartManager } from "../CartManager.js";

const router = Router()
const manager = new CartManager("./cart.json")

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const cart = await manager.getCartById(id)
    if (cart.error) {
        res.status(404).json({ message: cart.message })
    } else {
        res.status(200).json(cart)
    }
})

router.post('/', async (req, res) => {
    const cart = { "products": [] }

    const respuesta = await manager.addCart(cart)
    if (!respuesta.error) {
        res.status(201).json({ message: respuesta.message })
    } else {
        res.status(400).json({ message: respuesta.message })
    }
})


router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = Number(req.params.cid)
    const productId = Number(req.params.pid)
    const respuesta = await manager.updateCart(cartId, productId)

    if (!respuesta.error) {
        res.status(200).json({ message: respuesta.message })
    }
})

export default router
