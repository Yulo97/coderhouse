export default class ProductRepositories {
    constructor(dao) {
        this.dao = dao
    }
    getAll = async (limit, page, status, sort, category) => this.dao.getAll(limit, page, status, sort, category)
    getById = async id => this.dao.getById(id)
    create = async body => this.dao.create(body)
    update = async (id, body) => this.dao.update(id, body)
    delete = async (id) => this.dao.delete(id)
}