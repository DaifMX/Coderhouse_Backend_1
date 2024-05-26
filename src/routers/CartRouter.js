import { Router } from 'express';
import CartController from '../controllers/CartController.js'
import * as service from '../services/CartService.js'

const router = Router();
const controller  = new CartController(service);

router.get('/:cid', controller.getByCid);

router.post('/', controller.create);

//En la asignatura nos venia que pusieramos un POST, sin embargo como estamos
//modificando el array de un objeto ya existente me parece más pertinenete usar un PUT.
router.put('/:cid/product/:pid', controller.addToCart);

export default router;