//------------------------------------------------------
export default class CartController {
    service;

    constructor(service){
        this.service = service;
    };

    getByCid = async (req, res) => {
        try {
            const cid = req.params.cid;
            const cart = await this.service.getByCid(cid);
            res.status(200).json({status: 'success', payload: cart});

        } catch (err){
            res.status(404).json({status: 'error', error: err.message});
        }

    };

    create = async (req, res) => {
        try {
            const cart = await this.service.create(req.body);
            res.status(201).json({status: 'success', payload: cart});

        } catch (err){
            res.status(500).json({status: 'error', error: err.message});
        }
    };

    increaseQuantityFromProduct = async (req, res) => {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;

            const quantity = req.body.quantity;
            
            const newCart = await this.service.increaseQuantityFromProduct(cid, pid, quantity);
            res.status(200).json({status: 'success', payload: newCart});

        } catch (err){
            res.status(400).json({status: 'error', error: err.message});
        }
    };

    replaceCart = async (req, res) => {
        try{
            const cid = req.params.cid;
            const newCart = req.body;

            const cart = await this.service.replaceCart(cid, newCart);

            res.status(200).json({status: 'success', payload: cart});
            
        } catch (err){
            res.status(400).json({status: 'error', error: err.message});
        }
    };

    deleteProductFromCart = async (req, res) => {
        try{
            const cid = req.params.cid;
            const pid = req.params.pid;

            const cart = await this.service.deleteProductFromCart(cid, pid);
            res.status(200).json({status: 'success', payload: cart});

        } catch (err) {
            res.status(400).json({status: 'error', error: err.message});
        }
    };

    wipeProductsFromCart = async (req, res) => {
        try{
            const cid = req.params.cid;
            const cart = await this.service.wipeProductsFromCart(cid);

            res.status(200).json({status: 'success', payload: cart});

        } catch (err) {
            res.status(400).json({status: 'error', error: err.message});
        }
    };
}