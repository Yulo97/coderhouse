import { cartServices } from "../services/index.js"

export const getCarts = async (req, res) => {
    const limit = req.query.limit
    try {
        const result = await cartServices.getAll(limit)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const getCartById = async (req, res) => {
    const id = req.params.id
    try {
        const result = await cartServices.getById(id)
        res.status(200).json({ status: "success", payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const addCart = async (req, res) => {
    const body = req.body
    try {
        const result = await cartServices.create(body)
        res.status(201).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const updateCart = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const result = await cartServices.update(id, body)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const deleteCart = async (req, res) => {
    const id = req.params.id
    try {
        const result = await cartServices.delete(id)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const deleteProductOfCart = async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid

    try {
        const result = await cartServices.deleteProductCart(idCart, idProduct)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const updateProductOfCart = async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const { quantity } = req.body;

    try {
        const result = await cartServices.updateProductCart(idCart, idProduct, quantity)
        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
}

