class CartController {
    service;

    constructor(service){
        this.service = service;
    }

    getByCid = async (req, res) => {
        try {
            const cid = req.params.cid;
            const cart = this.service.getByCid(cid);
            res.status(200).json(cart);

        } catch (err){
            res.status(404).json({error: err.message});
        }

    }

    create = async (req, res) => {
        try {
            const cart = this.service.create(req.body);
            res.status(201).json(cart);

        } catch (err){
            res.status(500).json({error: err.message});
        }


    }

    addToCart = async (req, res) => {
        try {
            const cid = parseInt(req.params.cid);
            const pid = parseInt(req.params.pid);
            
            const newCart = this.service.addToCart(cid, pid);
            res.status(200).json(newCart);

        } catch (err){
            res.status().json({error: err.message});
        }
    }
}

export default CartController;