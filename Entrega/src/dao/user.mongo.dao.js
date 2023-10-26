import userModel from "../models/user.model.js"
import UserDTO from "../dto/user.dto.js";

export default class userDAO {
    getAll = async () => {
        const users = await userModel.find();
        return users.map(user => new UserDTO(user));
    }
    getById = async id => await userModel.findById(id)
    findOne = async body => await userModel.findOne({email: body})
    create = async body => await userModel.create(body)
    update = async (id, body) => await userModel.updateOne({ _id: id }, body)
    delete = async id => await userModel.deleteOne({ _id: id })
    async deleteInactiveUsers() {
        // Obtén la fecha actual
        const currentDate = new Date();

        // Calcula la fecha que representa "2 días atrás"
        const twoDaysAgo = new Date(currentDate);
        twoDaysAgo.setDate(currentDate.getDate() - 2);

        // Elimina los usuarios cuya última conexión sea anterior a twoDaysAgo
        await userModel.deleteMany({
            last_connection: { $lt: twoDaysAgo }
        });
    }
}