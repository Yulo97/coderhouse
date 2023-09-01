import productModel from "../models/product.model.js"

export default class productDAO {
    getAll = async (limit, page, status, sort, category) => {
        if (!category) return await productModel.paginate({ status }, { limit, page, sort: { price: sort } })
        return await productModel.paginate({ status, category }, { limit, page, sort: { price: sort } })
    }
    getById = async id => await productModel.findById(id).lean()
    create = async body => await productModel.create(body)
    update = async (id, body) => await productModel.updateOne({ _id: id }, body)
    delete = async id => await productModel.deleteOne({ _id: id })
}