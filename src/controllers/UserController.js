import { userService } from "../repositories/index.js";

//------------------------------------------------------
export default class UserController {
    service = userService;

    getAll = async(req, res) => {
        let limit = 10;
        const pageNumber = parseInt(req.query.page);

        if(req.query.limit) limit = parseInt(req.query.limit);
        if(req.query.limit < 1) limit = 10;
        
        try {
            const payload = await userService.getAll(limit, pageNumber);
            console.log(payload.docs);

            res.sendSuccess({
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
            res.sendInternalServerError(err.message);
        }
    };

    getByEmail = async (req, res) => {
        try {
            const email = req.body.email;
            const user = await userService.getByEmail(email);
            res.sendSuccess(user);
            
        } catch (err){
            res.sendNotFound();
        }
    };

    create = async (req, res) => {
        try {
            const user = await userService.create(req.body);
            res.sendCreated(user);

        } catch (err){
            res.sendInternalServerError(err.message);
        }
    };
}