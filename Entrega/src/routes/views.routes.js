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

router.get('/products', (req, res, next) => {

    if (!req.isAuthenticated()) return res.redirect('/api/views/login');

    if (req.user.role === "admin") return next()

    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: true, message: 'Acceso denegado. No tienes permisos para acceder a esta página.' });
    }

}, async (req, res) => {
    try {
        const { first_name } = req.user

        const limit = req.query.limit || 2
        const page = req.query.page || 1
        const status = req.query.status === "true" ? true : false || true
        const sort = req.query.sort === "desc" ? -1 : 1 || 1
        const category = req.query.category || undefined

        if (!category) {
            const result = await productModel.paginate({ status }, { limit, page, sort: { price: sort } })
            const products = JSON.parse(JSON.stringify(result));
            res.render('products', { products, first_name })
        } else {
            const result = await productModel.paginate({ status, category }, { limit, page, sort: { price: sort } })
            const products = JSON.parse(JSON.stringify(result));
            res.render('products', { products, first_name })
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
        res.render('cart', products)
    } catch (error) {
        console.log(error)
    }
})

router.get('/register', async (req, res) => {
    res.render('register')
})

router.get('/login', async (req, res) => {
    res.render('login')
})

export default router