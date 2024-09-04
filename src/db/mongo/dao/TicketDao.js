import TicketModel from '../models/TicketModel.js';

//------------------------------------------------------
export default class TicketDao {
    getAll = async () => await TicketModel.find();

    get = async (...params) => await TicketModel.findOne(...params);

    create = async (...params) => await TicketModel.create(...params);

    update = async (id, ...params) => await TicketModel.findOneAndUpdate({_id: id}, {$set: params}, {new: true});

    remove = async (id) => await TicketModel.findOneAndDelete(id);
}