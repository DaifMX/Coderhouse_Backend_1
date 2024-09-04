import UserModel from '../models/UserModel.js';

//------------------------------------------------------
export default class UserDao {
    get = async (...params) => await UserModel.findOne(...params);

    paginate = async (page, limit) => await UserModel.paginate({}, {page, limit})

    create = async (...params) => await UserModel.create(...params);

    update = async (email, ...params) => await UserModel.findOneAndUpdate({email: email}, {$set: params}, {new: true});

    remove = async (id) => await UserModel.findOneAndDelete(id);
}