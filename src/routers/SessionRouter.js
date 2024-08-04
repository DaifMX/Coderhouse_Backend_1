import { Router } from "express";
import SessionController from '../controllers/SessionController.js';
import { passportCall } from "../middlewares/passportCall.js";

//------------------------------------------------------
const router = Router();
const controller = new SessionController();

//GET
router.get('/current', controller.current);
router.get('/logout', controller.logout);

//POST
router.post('/register', passportCall('register'), controller.register);
router.post('/login', passportCall('login'), controller.login);

export default router;