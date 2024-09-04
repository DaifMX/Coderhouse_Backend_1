import ProductDao from '../db/mongo/dao/ProductDao.js';
import TicketDao from '../db/mongo/dao/TicketDao.js';
import UserDao from '../db/mongo/dao/UserDao.js';
import ElementNotFoundError from '../errors/ElementNotFoundError.js';
import { generateRandomString } from '../utils.js';

//------------------------------------------------------
export default class CartRepository {
    constructor(dao){
        this.dao = dao;
    }

    userDao = new UserDao();
    productDao = new ProductDao();
    ticketDao = new TicketDao();
    
    create = async (cartEntry) => this.dao.create(cartEntry);
        
    getByCid = async (cid) => {
        const cart = await this.dao.get({_id: cid});

        if(!cart) throw new Error(`Carrito con código ${cid} no existe en la base de datos.`);

        return cart;
    };

    purchase = async (cid, uid) => {
        const cart = await this.dao.get({_id: cid});
        let amount = 0;

        const failedProducts = [];

        for(const item of cart.products){
            const pid = item.product;
            const product = await this.productDao.get({_id: pid});

            if(!product) throw new Error(`Producto con código ${pid} no existe en la base de datos.`);

            //Calcular stock
            const theoricalStockLeft = product.stock - item.quantity;

            if (theoricalStockLeft < 1) {
                failedProducts.push({product: pid, quantity: item.quantity});
            
            } else {
                //Modificar stock
                product.stock = theoricalStockLeft;
                await product.save();

                // Calcular precio total
                amount += product.price;
            }
        }

        // Vaciar toda la lista de productos del carro
        cart.products = [];
        
        // Verificar si hubo algun item sin stock para dejarlo en el carrito
        if(failedProducts.length){
            // Si hubo alguno producto fallido copia el array de productos sin stock y lo copia en el array de productos del carro
            cart.products = failedProducts;
            return failedProducts;
        }

        const user = await this.userDao.get({_id: uid});
        const purchaser = user.email;

        const ticketEntry = {code: generateRandomString(), amount, purchaser};
        const ticket = this.ticketDao.create(ticketEntry);

        await cart.save();
        return ticket;
    };

    replaceCart = async (cid, cartEntry) => {
        const cart = await this.dao.get({_id: cid});
        cart.products = [];

        for(const item of cartEntry.products){
            const pid = item.product;
            const product = await this.productDao.get({_id: pid});

            if(!product) throw new Error(`Producto con código ${pid} no existe en la base de datos.`);

            cart.products.push({product: pid, quantity: item.quantity});
        }
        
        await cart.save();
        return cart;
    };

    increaseQuantityFromProduct = async (cid, pid, quantity) => {
        const product = await this.productDao.get({_id: pid});
        if(!product) throw new ElementNotFoundError('Elemento no encontrado en la base datos');
        
        const cart = await this.dao.get({_id: cid});
        if(!cart) throw new ElementNotFoundError('Elemento no encontrado en la base de datos');
        
        cart.products.forEach((item) => {
            if (item.product._id == pid) item.quantity = quantity;
        });
        
        await cart.save();
        
        return await this.dao.get({_id: cid});
    };

    deleteProductFromCart = async (cid, pid) => {
        const cart = await this.dao.get({_id: cid});
        if(!cart) throw new ElementNotFoundError('Elemento no encontrado en la base de datos');
    
        cart.products.forEach((e, index)=>{
            if ( e.product._id == pid ) {
                cart.products.splice(index, 1)
            }
        });
        await cart.save();
        return cart;
    };

    wipeProductsFromCart = async (cid) => {
        const cart = await this.dao.get({_id: cid});
        cart.products = [];
        await cart.save();
        
        return cart;
    };
}