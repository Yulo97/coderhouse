import cartModel from "../dao/models/cart.model.js"

export const getCartsService = async limit => {
    return await cartModel.find().populate({ path: 'products.product' }).limit(limit).lean().exec()
}

export const getCartsByIdService = async (id) => {
    return await cartModel.findById(id).populate({ path: "products.product" }).lean()
}

export const addCartServices = async (body) => {
    return await cartModel.create(body)
}

export const updateCartServices = async (id, body) => {
    return await cartModel.updateOne({ _id: id }, body)
}

export const deleteCartServices = async (id) => {
    return await cartModel.deleteOne({ _id: id })
}

export const deleteProductOfCartServices = async (idCart, idProduct) => {
    return await cartModel.updateOne({ _id: idCart }, { $pull: { products: { product: idProduct } } })
}

export const updateProductOfCartServices = async (idCart, idProduct, quantity) => {
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
    return result;
}