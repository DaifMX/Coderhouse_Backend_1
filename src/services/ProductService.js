import fs from 'fs';
import validate from '../schema/ProductSchema.js';
import ElementNotFoundError from '../errors/ElementNotFoundError.js';

const PATH = './src/db/Products.json';
const productObject = JSON.parse(await fs.promises.readFile(PATH, 'utf-8'));
const products = Object.values(productObject); //Array de Objetos transformado del JSON

export const getAll = () => productObject;

export const getByPid = (pid) => {
    const product = products.filter(e => e.pid == pid);

    if(product.length == 0){
        throw new ElementNotFoundError(`Product with id ${pid} not found.`)
    }

    return product;
};

export const create = async (product) => {
    if(!products.some(e => e.code === product.code)){
        //Save Product
        product = {
            pid: products.length + 1,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status: true,
            stock: product.stock,
            category: product.category,
            thumbnails: product.thumbnails,
        };

        const newProduct = validate(product);

        products.push(newProduct);
        await fs.promises.writeFile(PATH, JSON.stringify(products, null, '\t'));
        
        return products[products.length -1];
    
    } else {
        //Update Stock
        const index = products.findIndex(e => e.code === product.code);
        const productInDb = products[index];

        productInDb.stock = productInDb.stock + product.stock;
        await fs.promises.writeFile(PATH, JSON.stringify(products, null, '\t'));

        return {
            msg: 'This product already existed on the data base. As a result, its stock got updated.', 
            productInDb,
        };
    }
};

export const update = async (pid, newProduct) => {
    if(pid < 0){throw new Error('Invalid ID');}
    const index = products.findIndex(e => e.pid == pid);
    if(index == undefined){throw new ElementNotFoundError(`Product with id ${pid} not found.`);};

    const productInDb = products[index];

    const combined = {
        ...productInDb,
        ...newProduct
    };

    const curatedProduct = validate(combined, true);
    curatedProduct.pid = productInDb.pid;

    products[index] = curatedProduct;
    await fs.promises.writeFile(PATH, JSON.stringify(products, null, '\t'));

    return curatedProduct;
};

export const remove = async (pid) => {
    const index = products.findIndex(product => product.pid == pid);

    if (index !== -1) {
        products.splice(index, 1);

    } else {
        throw new ElementNotFoundError(`Product with pid ${pid} not found.`);
    }

    await fs.promises.writeFile(PATH, JSON.stringify(products, null, '\t'));
};