import BaseRouter from './BaseRouter.js';
import CartController from '../controllers/CartController.js';

const controller = new CartController()

//------------------------------------------------------
export default class CartRouter extends BaseRouter {
    init() {
        this.put('/:cid/products/:pid', ['USER'], controller.increaseQuantityFromProduct);

        this.put('/:cid', ['USER'], controller.replaceCart);

        this.put('/:cid/purchase', ['USER'], controller.purchase);

        this.delete('/:cid/products/:pid', ['USER'], controller.deleteProductFromCart);

        this.delete('/:cid', ['USER'], controller.wipeProductsFromCart);

        this.get('/:cid', ['USER'], controller.getByCid);

        this.post('/', ['USER'], controller.create);
    }
}