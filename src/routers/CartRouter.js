import { Router } from 'express';
import CartController from '../controllers/CartController.js'
import { CartService } from '../services/index.js';

const router = Router();
const controller  = new CartController(CartService);

router.get('/:cid', controller.getByCid);

router.post('/', controller.create);

//En la asignatura nos venia que pusieramos un POST, sin embargo como estamos
//modificando el array de un objeto ya existente me parece más pertinenete usar un PUT.
router.put('/:cid/products/:pid', controller.increaseQuantityFromProduct);

router.put('/:cid', controller.replaceCart);

router.delete('/:cid/products/:pid', controller.deleteProductFromCart);

router.delete('/:cid', controller.wipeProductsFromCart);

export default router;