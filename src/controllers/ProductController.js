import {productService} from '../repositories/index.js';
import ElementNotFoundError from "../errors/ElementNotFoundError.js";

//------------------------------------------------------
export default class ProductController {
    service = productService; //Declaración de variables

    getAll = async(req, res) => {
        let limit = 10;
        const pageNumber = parseInt(req.query.page);

        if(req.query.limit) limit = parseInt(req.query.limit);
        if(req.query.limit < 1) limit = 10;
        
        try {
            const payload = await productService.getAll(limit, pageNumber);
            res.status(200).json({
                status: 'success',
                payload: payload.docs.slice(0, limit),
                totalPages: payload.totalPages,
                prevPage: payload.prevPage,
                nextPage: payload.nextPage,
                page: pageNumber,
                hasPrevPage: payload.hasPrevPage,
                hasNextPage: payload.hasNextPage,
                prevLink: payload.hasPrevPage ? `localhost:8080/api/products?limit=${limit}&page=${pageNumber-1}` : null,
                nextLink: payload.hasNextPage ? `localhost:8080/api/products?limit=${limit}&page=${pageNumber+1}`: null,
            });
        
        } catch (err) {
            res.status(500).json({status: 'success', error: err.message});
        }
    };

    getByCode = async(req, res) => {
        try {
            const code = req.params.code;
            const product = await productService.getByCode(code);
            res.status(200).json({status: 'success', payload: product});

        } catch (err) {
            res.status(404).json({status: 'error', error: err.message});
        }
    };

    create = async(req, res) => {
        try {
            const product = await productService.create(req.body);
            const {type, values} = product;
            
            if ( type === 'CREATE' ) {
                req.io.emit('newProduct', {type, values: product.values});

            } else if ( type === 'UPDATE' ) {
                req.io.emit('newProduct', {type, values: productService.getAll()});
            }
            
            res.status(201).json(product);

        } catch (err) {
            res.status(500).json({error: err.message});
        }
    };

    update = async(req, res) => {
        try {
            const code = req.params.code;
            const product = req.body;
            const newProduct = await productService.update(code, product);
            res.status(201).json({status: 'success', payload: newProduct});

        } catch (err) {
            if(err instanceof ElementNotFoundError){
                res.status(400).json({error: err.message});
            
            } else if(err instanceof Error) {
                res.status(500).json({error: err.message});
            }
        }
    };

    remove = async (req, res) => {
        try {
            const code = req.params.code;
            const payload = await productService.remove(code);

            if(!payload) res.status(400).json({msg: 'Producto no existente'});
            res.status(200).json({status: 'success', msg: 'Producto removido', payload: payload});

        } catch (err) {
            res.status(404).json({error: err.message});
        }
    };
}