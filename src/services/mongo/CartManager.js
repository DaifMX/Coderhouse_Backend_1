import ElementNotFoundError from '../../errors/ElementNotFoundError.js';
import ProductModel from './models/ProductModel.js';
import CartModel from './models/CartModel.js';

export default class CartManager {   
        create = async (cartEntry) => {
            const cartOnDb = new CartModel();

            for(const item of cartEntry.products){
                const pid = item.product;
                const product = await ProductModel.findOne({_id: pid});

                if(!product) throw new Error(`Producto con código ${pid} no existe en la base de datos.`);

                const theoricalStockLeft = product.stock - item.quantity;

                if(theoricalStockLeft < 1) throw new Error('Stock insuficiente.');

                cartOnDb.products.push({product: pid, quantity: item.quantity});
                product.stock = theoricalStockLeft;
                await product.save();
            }
            
            await cartOnDb.save();
            return cartOnDb;
        };

    getByCid = async (cid) => {
        const cart = await CartModel.findOne({_id: cid});

        if(!cart) throw new Error(`Carrito con código ${cid} no existe en la base de datos.`);

        return cart;
    };

    replaceCart = async (cid, cartEntry) => {
        const cartOnDb = await CartModel.findOne({_id: cid});
        cartOnDb.products = [];

        for(const item of cartEntry.products){
            const pid = item.product;
            const product = await ProductModel.findOne({_id: pid});

            if(!product) throw new Error(`Producto con código ${pid} no existe en la base de datos.`);

            const theoricalStockLeft = product.stock - item.quantity;
            if(theoricalStockLeft < 1) throw new Error('Stock insuficiente.');

            cartOnDb.products.push({product: pid, quantity: item.quantity});
            product.stock = theoricalStockLeft;
            await product.save();
        }
        
        await cartOnDb.save();
        return cartOnDb;
    };

    increaseQuantityFromProduct = async (cid, pid, quantity) => {
        const product = await ProductModel.findOne({_id: pid});
        if(!product) throw new ElementNotFoundError('Elemento no encontrado en la base datos');
        
        const cart = await CartModel.findOne({_id: cid});
        if(!cart) throw new ElementNotFoundError('Elemento no encontrado en la base de datos');
        
        cart.products.forEach((item, index) => {
            if (item.product._id == pid) {
                product.stock = product.stock + item.quantity - quantity;
                
                if(product.stock < 1) throw new Error('Stock insuficiente.');
                
                item.quantity = quantity;
            }
        });
        
        await product.save();
        await cart.save();
        
        return CartModel.findOne({_id: cid});
    };

    deleteProductFromCart = async (cid, pid) => {
        const cart = await CartModel.findOne({_id: cid});
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
        const cart = await CartModel.findOne({_id: cid});
        cart.products = [];
        await cart.save();
        
        return cart;
    };

   
}