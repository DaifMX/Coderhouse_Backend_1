import UserModel from '../db/mongo/models/UserModel.js';
import AuthService from './AuthService.js';
import validate from '../schemas/UserSchema.js';

//------------------------------------------------------
export default class UserService {
    getAll = async (limit, pageNumber) => {
        const user = await UserModel.paginate({}, {page: pageNumber, limit: limit}); 
        
        return user;
    }

    getByEmail = async (email) =>{ return await UserModel.findOne({email: email});}

    create = async (user) => {
        const finalUser = validate(user);
        const authService = new AuthService();

        const hashedPassword = await authService.hashPassword(finalUser.password);

        finalUser.password = hashedPassword;
        
        return await UserModel.create(finalUser);
    };

    update = (email, user) => {
        const finalUser = validate(user, true);
        return UserModel.findOneAndUpdate({email: email}, {$set: finalUser}, {new: true});
    };

    remove = async (email) => await UserModel.findOneAndDelete({email: email});
}