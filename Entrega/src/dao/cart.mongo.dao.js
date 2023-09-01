import cartModel from "../models/cart.model.js";

export default class CartDAO {
    getAll = async limit => await cartModel.find().populate({ path: 'products.product' }).limit(limit).lean().exec()
    getById = async id => await cartModel.findById(id).populate({ path: "products.product" }).lean()
    create = async body => await cartModel.create(body)
    update = async (id, body) => await cartModel.updateOne({ _id: id }, body)
    delete = async id => await cartModel.deleteOne({ _id: id })
    deleteProductCart = async (idCart, idProduct) => await cartModel.updateOne({ _id: idCart }, { $pull: { products: { product: idProduct } } })
    updateProductCart = async (idCart, idProduct, quantity) => {
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
}