import { Router } from "express";
import ViewController from "../controllers/ViewController.js";

//------------------------------------------------------
const router = Router();
const controller = new ViewController;

router.get('/', controller.home);
router.get('/realtimeproducts', controller.realTimeProducts);

export default router;