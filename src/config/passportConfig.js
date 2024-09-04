import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy } from "passport-jwt";

import {authService, userService} from "../repositories/index.js";

function cookieExtractor(req) {
    return req?.cookies?.['token'];
};

const initializePassportConfig = () =>{
    passport.use('register', new LocalStrategy({usernameField:'email',passReqToCallback:true},async (req,email,password,done)=>{
        const isUserInDb = await userService.getByEmail(email);
        if(isUserInDb){
            return done(null,false,{message:"User already exists"});
        };

        const user = userService.create(req.body);
        return done(null, user);
    }));

    passport.use('login', new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        if(!email || !password) return done(null, false, {message: 'Incomplete credentials'})

        const user = await userService.getByEmail(email);

        if(!user) return done(null, false, {message:"Incorrect credentials"});

        const isValidPassword = await authService.validatePassword(password, user.password);

        if(!isValidPassword) return done(null,false,{message:"Incorrect credentials"});

        return done(null, user);
    }));

    passport.use('current',new JWTStrategy({
        secretOrKey:'IAmASecretKey',
        jwtFromRequest: cookieExtractor
    }, async (payload,done) => {
        done(null, payload)
    }
    ));

    return passport;
};

const passportWithConfig = initializePassportConfig();

export default passportWithConfig;