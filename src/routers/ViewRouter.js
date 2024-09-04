import BaseRouter from './BaseRouter.js';
import ViewController from "../controllers/ViewController.js";

//------------------------------------------------------
const controller = new ViewController;

export default class ViewRouter extends BaseRouter{    
    init(){
        this.get('/', [], controller.home);
        this.get('/realtimeproducts', [], controller.realTimeProducts);
    }
}