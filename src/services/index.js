import CartMongo from "./mongo/CartManager.js";
import ProductMongo from "./mongo/ProductManager.js";

//Funciones usando filesystem (no todas disponibles)
//import CartFs from "./fs/CartManager";
//import ProductFs from "./fs/ProductManager";

export const CartService = new CartMongo();

export const ProductService = new ProductMongo();