import userModel from "../models/user.model.js"

export default class ticketDAO {
    getAll = async () => await userModel.find()
    getById = async id => await userModel.findById(id)
    findOne = async body => await userModel.findOne({email: body})
    create = async body => await userModel.create(body)
    update = async (id, body) => await userModel.updateOne({ _id: id }, body)
    delete = async id => await userModel.deleteOne({ _id: id })
}