import UserModel from '../db/mongo/models/UserModel.js';
import { authService } from './index.js';
import validate from '../schemas/UserSchema.js';

//------------------------------------------------------
export default class UserRepository {
    constructor(dao){
        this.dao = dao;
    }
    
    getAll = async (limit, pageNumber) => await this.dao.paginate({}, {page: pageNumber, limit: limit}); 

    getByEmail = async (email) => await this.dao.get({email});

    getById = async (id) => await this.dao.get({_id: id});

    create = async (userEntry) => {
        const user = validate(userEntry);

        const hashedPassword = await authService.hashPassword(user.password);
        user.password = hashedPassword;
        
        return await this.dao.create(user);
    };

    update = (email, userEntry) => {
        const user = validate(userEntry, true);
        return this.dao.update(email, user);
    };

    remove = async (email) => await this.dao.remove(email);
}