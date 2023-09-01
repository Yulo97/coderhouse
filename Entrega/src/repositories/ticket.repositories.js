export default class TicketRepositories {
    constructor(dao) {
        this.dao = dao
    }
    getAll = async () => this.dao.getAll()
    getById = async id => this.dao.getById(id)
    create = async body => this.dao.create(body)
    update = async (id, body) => this.dao.update(id, body)
    delete = async (id) => this.dao.delete(id)
}