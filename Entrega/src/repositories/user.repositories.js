export default class UserRepositories {
    constructor(dao) {
        this.dao = dao
    }
    getAll = async () => this.dao.getAll()
    getById = async id => this.dao.getById(id)
    findOne = async body => this.dao.findOne(body)
    create = async body => this.dao.create(body)
    update = async (id, body) => this.dao.update(id, body)
    delete = async (id) => this.dao.delete(id)
}