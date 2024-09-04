import BaseRouter from './BaseRouter.js';

import SessionController from '../controllers/SessionController.js';
import { passportCall } from "../middlewares/passportCall.js";

const controller = new SessionController();

//------------------------------------------------------
export default class SessionRouter extends BaseRouter{
    init(){
        //GET
        this.get('/current', ['PUBLIC'], passportCall('current'), controller.current);
        this.get('/logout', ['USER'],  controller.logout);

        //POST
        this.post('/register', ['USER'], passportCall('register'), controller.register);
        this.post('/login', ['PUBLIC'], passportCall('login'), controller.login);
        // this.post('/login', ['PUBLIC'], passport.authenticate('login'), controller.login);
    }
}