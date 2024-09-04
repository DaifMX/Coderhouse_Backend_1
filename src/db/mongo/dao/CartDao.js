import CartModel from '../models/CartModel.js';

//------------------------------------------------------
export default class CartDao {
    get = async (params) => await CartModel.findOne(params);

    create = async (...params) => await CartModel.create(...params);

    update = async (id, ...params) => await CartModel.findOneAndUpdate({_id: id}, {$set: params}, {new: true});

    remove = async (id) => await CartModel.findOneAndDelete(id);
}