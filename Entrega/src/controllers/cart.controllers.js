import cartModel from "../dao/models/cart.model.js"

export const getCarts = async (req, res) => {
    const limit = req.query.limit
    try {
        const result = await cartModel.find().limit(limit).lean().exec()
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const getCartById = async (req, res) => {
    const id = req.params.id
    try {
        const result = await cartModel.findById(id).lean()
        res.status(200).json({ status: "success", payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const addCart = async (req, res) => {
    const body = req.body
    try {
        const result = await cartModel.create(body)
        res.status(201).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const updateCart = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const result = await cartModel.updateOne({ _id: id }, body)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const deleteCart = async (req, res) => {
    const id = req.params.id
    try {
        const result = await cartModel.deleteOne({ _id: id })
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}