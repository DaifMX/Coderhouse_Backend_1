export default class TicketRepository{
    constructor(dao){
        this.dao = dao
    }

    getAll(){
        return this.dao.get();
    }

    getTicketById(id){
        return this.dao.getOne({_id:id});
    }

    getTicketByCode(code){
        return this.dao.getOne({code:code});
    }

    create(ticket){
        return this.dao.create(ticket);
    }
}