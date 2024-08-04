import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy} from "passport-jwt";

import UserService from "../services/UserService.js";
import AuthService from "../services/AuthService.js";

const service = new UserService();

const initializePassportConfig = () =>{
    passport.use('register', new LocalStrategy({usernameField:'email',passReqToCallback:true},async (req,email,password,done)=>{
        const isUserInDb = await service.getByEmail(email);
        if(isUserInDb){
            return done(null,false,{message:"User already exists"});
        };

        const user = service.create(req.body);
        return done(null, user);
    }));

    passport.use('login', new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        const user = await service.getByEmail(email);

        if(!user) return done(null, false, {message:"Incorrect credentials"});

        const auth = new AuthService();
        const isValidPassword = await auth.validatePassword(password, user.password);

        if(!isValidPassword) return done(null,false,{message:"Incorrect credentials"});

        return done(null, user);
    }));

    passport.use('current',new JWTStrategy({
        secretOrKey:'IAmASecretKey',
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor])
    }, async (payload,done) => done(null,payload)
    ));
};

function cookieExtractor(req){
    return req?.cookies?.['token'];
};

export default initializePassportConfig;