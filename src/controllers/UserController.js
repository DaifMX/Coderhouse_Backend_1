//------------------------------------------------------
export default class UserController {
    service;

    constructor(service){
        this.service = service;
    };

    getAll = async(req, res) => {
        let limit = 10;
        const pageNumber = parseInt(req.query.page);

        if(req.query.limit) limit = parseInt(req.query.limit);
        if(req.query.limit < 1) limit = 10;
        
        try {
            const payload = await this.service.getAll(limit, pageNumber);
            console.log(payload.docs);

            res.status(200).json({
                status: 'success',
                payload: payload.docs.slice(0, limit),
                totalPages: payload.totalPages,
                prevPage: payload.prevPage,
                nextPage: payload.nextPage,
                page: pageNumber,
                hasPrevPage: payload.hasPrevPage,
                hasNextPage: payload.hasNextPage,
                prevLink: payload.hasPrevPage ? `localhost:8080/api/users?limit=${limit}&page=${pageNumber-1}` : null,
                nextLink: payload.hasNextPage ? `localhost:8080/api/users?limit=${limit}&page=${pageNumber+1}`: null,
            });
        
        } catch (err) {
            res.status(500).json({status: 'success', error: err.message});
        }
    };


    getByEmail = async (req, res) => {
        try {
            const email = req.body.email;
            const user = await this.service.getByEmail(email);
            res.status(200).json({status: 'success', payload: user});

        } catch (err){
            res.status(404).json({status: 'error', error: err.message});
        }
    };

    create = async (req, res) => {
        try {
            const user = await this.service.create(req.body);
            res.status(201).json({status: 'success', payload: user});

        } catch (err){
            res.status(500).json({status: 'error', error: err.message});
        }
    };
}