export default class UserDto {
    id;
    fullName;
    role;

    constructor(user){
        this.id = user.id;
        this.fullName = user.fullName;
        this.role = user.role;
    };
}