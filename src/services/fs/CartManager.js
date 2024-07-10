import fs from 'fs';
import ElementNotFoundError from '../errors/ElementNotFoundError.js';
import validate from '../../schemas/CartSchema.js';

const PATH = './src/db/Carts.json';
const cartObject = JSON.parse(await fs.promises.readFile(PATH, 'utf-8'));
const carts = Object.values(cartObject);

export default class CartManager{
    getAll = () => cartObject;

    getByCid = (cid) => {
        const cart = carts.filter(e => e.cid == cid);
        
        if(cart.length == 0){
            throw new ElementNotFoundError(`Cart with id ${cid} not found.`)
        }

        return cart;
    };

    create = async (cart) => {
        cart = {
            cid: carts.length + 1,
            products: cart.products
        };

        const newCart = validate(cart);
        
        carts.push(newCart);
        await fs.promises.writeFile(PATH, JSON.stringify(carts, null, '\t'));

        return carts[carts.length - 1];
    };

    addToCart = async (cid, pid) => {
        const cart = carts.find(e => e.cid == cid);
        const product = cart.products.find(product => product.pid == pid);
        
        if(product){
            product.quantity = product.quantity + 1;

        } else {
            cart.products.push({pid: pid, quantity: 1});
        }

        await fs.promises.writeFile(PATH, JSON.stringify(carts, null, '\t'));
        return cart;
    };
}
