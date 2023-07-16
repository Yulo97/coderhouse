import { Router } from "express";
import productModel from "../dao/models/product.model.js";
import cartModel from "../dao/models/cart.model.js";

const router = Router()

router.get('/chat', (req, res) => {
    try {
        res.render('chat')
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
})

router.get('/realtimeproducts', (req, res) => {
    try {
        res.render('realtimeproducts')
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
})

router.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit || 2
        const page = req.query.page || 1
        const status = req.query.status === "true" ? true : false || true
        const sort = req.query.sort === "desc" ? -1 : 1 || 1
        const category = req.query.category || undefined

        if (!category) {
            const result = await productModel.paginate({ status }, { limit, page, sort: { price: sort } })
            const products = JSON.parse(JSON.stringify(result));
            console.log(products)
            res.render('products', { products })
        } else {
            const result = await productModel.paginate({ status, category }, { limit, page, sort: { price: sort } })
            const products = JSON.parse(JSON.stringify(result));
            res.render('products', { products })
        }
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
})

router.get('/carts/:cid', async (req, res) => {
    const id = req.params.cid
    try {
        const result = await cartModel.findById(id).populate({ path: "products.product" })
        const products = JSON.parse(JSON.stringify(result));
        console.log(products)
        res.render('cart', products)
    } catch (error) {
        console.log(error)
    }
})

export default router