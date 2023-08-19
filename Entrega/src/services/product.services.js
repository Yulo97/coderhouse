import productModel from "../dao/models/product.model.js"

export const getProductsServices = async (limit, page, status, sort, category) => {
    if (!category) return await productModel.paginate({ status }, { limit, page, sort: { price: sort } })
    return await productModel.paginate({ status, category }, { limit, page, sort: { price: sort } })
}

export const getProductByIdServices = async id => {
    return await productModel.findById(id).lean()
}

export const addProductServices = async body => {
    return await productModel.create(body)
}

export const updateProductServices = async (id, body) => {
    return await productModel.updateOne({ _id: id }, body)
}

export const deleteProductServices = async id => {
    return await productModel.deleteOne({ _id: id })
}