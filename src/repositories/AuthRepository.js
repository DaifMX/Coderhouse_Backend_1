import bcrypt from 'bcrypt';

//------------------------------------------------------
export default class AuthRepository {
    constructor(params) {
        this.params = params;
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    };

    async validatePassword(password, userPassword){
        return bcrypt.compare(password, userPassword);
    };
}