import ElementNotFoundError from "../errors/ElementNotFoundError.js";

class ProductController {
    service; //Declaración de variables

    constructor(service) {
        this.service = service;
    }

    getAll = async(req, res) => {
        const limit = parseInt(req.query.limit);

        try {
            const products = await this.service.getAll();
            res.status(200).json(products.slice(0, limit));
        
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    };

    getByPid = async(req, res) => {
        try {
            const pid = req.params.pid;
            const product = await this.service.getByPid(pid);
            res.status(200).json(product);

        } catch (err) {
            res.status(404).json({error: err.message});
        }
    };

    create = async(req, res) => {
        try {
            const product = await this.service.create(req.body);
            res.status(201).json(product);

        } catch (err) {
            res.status(500).json({error: err.message});
        }
    };

    update = async(req, res) => {
        try {
            const pid = req.params.pid;
            const product = req.body;
            const newProduct = await this.service.update(pid, product);
            res.status(201).json(newProduct);

        } catch (err) {
            if(err instanceof ElementNotFoundError){
                res.status(404).json({error: err.message});
            
            } else if(err instanceof Error) {
                res.status(500).json({error: err.message});
            }
        }
    };

    remove = async (req, res) => {
        try {
            const pid = req.params.pid;
            await this.service.remove(pid);
            res.status(200).json({msg: 'Success'});

        } catch (err) {
            res.status(404).json({error: err.message})
        }
    };
}

export default ProductController;