import cartModel from "../dao/models/cart.model.js";
import * as servicesProduct from "../services/product.services.js";

export const renderChat = (req, res) => {
    try {
        res.render('chat')
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const renderRealTimeProducts = (req, res) => {
    try {
        res.render('realtimeproducts')
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const renderProducts = async (req, res) => {
    try {
        const { first_name } = req.user
        const limit = req.query.limit || 2
        const page = req.query.page || 1
        const status = req.query.status === "true" ? true : false || true
        const sort = req.query.sort === "desc" ? -1 : 1 || 1
        const category = req.query.category || undefined

        const result = await servicesProduct.getProductsServices(limit, page, status, sort, category)
        const products = JSON.parse(JSON.stringify(result));
        res.render('products', { products, first_name })

    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const getCartById = async (req, res) => {
    try {
        const id = req.params.cid
        const result = await cartModel.findById(id).populate({ path: "products.product" })
        const products = JSON.parse(JSON.stringify(result));
        res.render('cart', products)
    } catch (error) {
        console.log(error)
    }
}

export const renderLogin = async (req, res) => {
    res.render('login')
}

export const renderRegister = async (req, res) => {
    res.render('register')
}