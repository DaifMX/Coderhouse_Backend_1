//------------------------------------------------------
export default class ProductRepository {
    constructor(dao){
        this.dao = dao;
    }

    getAll = (limit, pageNumber) => this.dao.paginate({}, {page: pageNumber, limit});

    getByCode = (code) => this.dao.get({code});

    create = (product) => this.dao.create(product);

    update = (pid, product) => this.dao.update({_id: pid}, product);

    remove = async (code) => await this.dao.remove({code});
}
