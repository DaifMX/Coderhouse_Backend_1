import { Router } from "express";

import { passportCall } from "../middlewares/passportCall.js";
import { executePolicies } from "../middlewares/policies.js";

export default class BaseRouter {
    constructor(){
        this.router = Router();
        this.init();
    };

    init(){};

    getRouter(){
        return this.router;
    };

    get(path, policies, ...callbacks){
        if (!policies || !Array.isArray(policies)) throw new Error('Policies required for endpoint ' + path);
        this.router.get(path, this.generateCustomResponses, passportCall('current'), executePolicies(policies),  this.applyCallbacks(callbacks));
    };

    post(path, policies, ...callbacks){
        if (!policies || !Array.isArray(policies)) throw new Error('Policies required for endpoint ' + path);
        this.router.post(path, this.generateCustomResponses, passportCall('current'), executePolicies(policies), this.applyCallbacks(callbacks));
    };

    put(path, policies, ...callbacks){
        if (!policies || !Array.isArray(policies)) throw new Error('Policies required for endpoint ' + path);
        this.router.put(path, this.generateCustomResponses, passportCall('current'), executePolicies(policies), this.applyCallbacks(callbacks));
    };

    delete(path, policies, ...callbacks){
        if (!policies || !Array.isArray(policies)) throw new Error('Policies required for endpoint ' + path);
        this.router.delete(path, this.generateCustomResponses, passportCall('current'), executePolicies(policies), this.applyCallbacks(callbacks));
    };

    generateCustomResponses(_req, res, next){
         //2XX
         res.sendSuccess = (payload, msg) => res.status(200).json({status:'success', payload, msg});
         res.sendCreated = (payload, msg) => res.status(201).json({status: 'success', payload, msg});
         res.sendAccepted = (payload, msg) => res.status(202).json({status: 'success', payload, msg});
         
         // 4XX
         res.sendBadRequest = (reason) => res.status(400).json({
             status:'error', 
             error: reason || 'Error en la solicitud enviada. Contacte un administrador.'
         });
         res.sendUnauthorized = (reason) => res.status(401).json({
             status: 'error', 
             error: reason || 'Usuario no autorizado.'
         });
         res.sendNotFound = (reason) => res.status(404).json({
             status: 'error',
             error: reason || 'Recurso no encontrado.'
         });
         res.sendTooManyRequests = (reason) => res.status(429).json({
             status: 'error', 
             error: reason || 'Demasiadas solicitudes. Intente nuevamente más tarde.'
         });
         
         // 5XX
         res.sendInternalServerError = (reason) => res.status(500).json({
             status: 'error', 
             reason: reason || 'Error interno en el servidor. Contace un administrador.'
         });        
         
         next();
    };

    applyCallbacks(callbacks){
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch(error) {
                console.log(error);
                params[1].status(500).send({status:"error", error:`${error.name} ${error.message}`});
            }
        });
    };
}