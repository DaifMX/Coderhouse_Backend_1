import jwt from 'jsonwebtoken';

//------------------------------------------------------
export default class SessionController{
    register = async (req,res) => {
        res.send({status:"success",message:"Registered"});
    };
    
    login = async (req, res) => { 
        const sessionUser = {
            name:`${req.user.firstName} ${req.user.lastName}`,
            role:req.user.role,
            id:req.user._id
        };

        const token = jwt.sign(sessionUser, 'IAmASecretKey', {expiresIn:'1d'});
        res.cookie('token', token).send({status:"success",message:"logged in"});
    };
    
    current = async(req, res) => {
        if(!req.user){
            return res.status(401).send({status:"error",error:"Not logged in"});
        }
        res.send(req.user);
    };
    
    logout = async(req, res) => {
        res.clearCookie('token');
    };
}