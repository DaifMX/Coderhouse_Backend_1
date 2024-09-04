import jwt from 'jsonwebtoken';
import UserDto from '../dto/UserDto.js';

//------------------------------------------------------
export default class SessionController{
    register = async (_req, res) => res.sendSuccess();
    
    login = async (req, res) => { 
        const sessionUser = {
            id:req.user._id,
            fullName:`${req.user.first_name} ${req.user.last_name}`,
            role:req.user.role,
        };

        const token = jwt.sign(sessionUser, 'IAmASecretKey', {expiresIn:'1d'});
        res.cookie('token', token).send({status:"success",message:"logged in"});
    };
    
    current = async(req, res) => {
        if(!req.user){
            return res.sendUnauthorized();
        }

        const userObj = new UserDto(req.user);
        
        res.sendAccepted(userObj);
    };
    
    logout = async(_req, res) => res.clearCookie('token');
}