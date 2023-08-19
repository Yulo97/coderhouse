import * as services from "../services/product.services.js"

export const getProducts = async (req, res) => {
    const limit = req.query.limit || 2
    const page = req.query.page || 1
    const status = req.query.status === "true" ? true : false || true
    const sort = req.query.sort === "desc" ? -1 : 1 || 1
    const category = req.query.category || undefined

    try {
        const result = await services.getProductsServices(limit, page, status, sort, category)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const getProductById = async (req, res) => {
    const id = req.params.id
    try {
        const result = await services.getProductByIdServices(id)
        res.status(200).json({ status: "success", payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const addProduct = async (req, res) => {
    const body = req.body
    try {
        const result = await services.addProductServices(body)
        res.status(201).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const result = await services.updateProductServices(id, body)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const result = await services.deleteProductServices(id)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}