import cartModel from "../dao/models/cart.model.js"

export const getCarts = async (req, res) => {
    const limit = req.query.limit
    try {
        const result = await cartModel.find().populate({ path: 'products.product' }).limit(limit).lean().exec()
        res.status(200).json({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message })
    }
}

export const getCartById = async (req, res) => {
    const id = req.params.id
    try {
        const result = await cartModel.findById(id).populate({ path: "products.product" }).lean()
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

export const deleteProductOfCart = async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid

    try {
        const result = await cartModel.updateOne({ _id: idCart }, { $pull: { products: { product: idProduct } } })
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
        let result;

        // Verificar si el producto ya existe en el array "products"
        const existingProduct = await cartModel.findOne({
            _id: idCart,
            "products.product": idProduct
        });

        if (existingProduct) {
            // Actualizar la cantidad del producto existente
            result = await cartModel.updateOne(
                { _id: idCart, "products.product": idProduct },
                { $set: { "products.$.quantity": quantity } }
            );
        } else {
            // Agregar un nuevo producto al array "products"
            result = await cartModel.updateOne(
                { _id: idCart },
                { $push: { products: { product: idProduct, quantity: quantity } } }
            );
        }

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
}