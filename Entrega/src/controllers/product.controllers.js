import productModel from "../dao/models/product.model.js"

export const getProducts = async (req, res) => {
    try {
        const limit = req.query.limit || 2
        const page = req.query.page || 1
        const status = req.query.status === "true" ? true : false || true
        const sort = req.query.sort === "desc" ? -1 : 1 || 1
        const category = req.query.category || undefined

        if (!category) {
            const result = await productModel.paginate({ status }, { limit, page, sort: { price: sort } })
            res.status(200).json({ status: 'success', payload: result })

        } else {
            const result = await productModel.paginate({ status, category }, { limit, page, sort: { price: sort } })
            res.status(200).json({ status: 'success', payload: result })
        }

    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const getProductById = async (req, res) => {
    const id = req.params.id
    try {
        const result = await productModel.findById(id).lean()
        res.status(200).json({ status: "success", payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const addProduct = async (req, res) => {
    const body = req.body
    console.log("hola")
    try {
        const result = await productModel.create(body)
        res.status(201).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const result = await productModel.updateOne({ _id: id }, body)
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const result = await productModel.deleteOne({ _id: id })
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}