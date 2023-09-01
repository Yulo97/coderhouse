import ticketModel from "../models/ticket.model.js"

export default class ticketDAO {
    getAll = async () => await ticketModel.find()
    getById = async id => await ticketModel.findById(id)
    create = async body => await ticketModel.create(body)
    update = async (id, body) => await ticketModel.updateOne({ _id: id }, body)
    delete = async id => await ticketModel.deleteOne({ _id: id })
}