import { ticketServices, cartServices, productServices } from "../services/index.js"
import { nanoid } from "nanoid"

export const addTicket = async (req, res) => {
    try {
        const cart = await cartServices.getById(req.params.cid)

        const amount = cart.products.reduce((total, product) => {
            const productPrice = product.product.price;
            const productQuantity = product.quantity;
            return total + (productPrice * productQuantity);
        }, 0);

        const body = {
            cart: req.params.cid,
            code: nanoid(10),
            amount: amount,
            purcharser: req.user ? req.user.email : "example@whitoutmail.com"
        }

        const productosSinStock = []

        cart.products.forEach(item => { if (item.product.stock < item.quantity) productosSinStock.push(item) })

        if (productosSinStock.length !== 0) return res.status(400).json({ status: 'error', error: "Hay productos sin Stock", payload: productosSinStock })

        cart.products.forEach(async item => {
            const product = {
                ...item.product,
                stock: item.product.stock - item.quantity
            }
            await productServices.update(item.product._id, product)
        });

        const result = await ticketServices.create(body)

        // En caso que el ticket se haya creado exitosamente el CART se actualiza con 0 productos.
        await cartServices.update(req.params.cid, { products: [] })

        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
        logger.error(error.message)
    }
}