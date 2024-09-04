import {cartService, ticketService} from '../repositories/index.js';
import { jwtDecode } from 'jwt-decode';

//------------------------------------------------------
export default class CartController{
    getByCid = async (req, res) => {
        try {
            const cid = req.params.cid;
            const cart = await cartService.getByCid(cid);
            res.sendSuccess(cart);

        } catch (err){
            res.sendNotFound(err.message);
        }

    };

    create = async (req, res) => {
        try {
            const cart = await cartService.create(req.body);
            res.sendCreated(cart);

        } catch (err){
            res.sendInternalServerError(err.message);
        }
    };

    purchase = async (req, res) => {
        try {
            const cid = req.params.cid;
            const token = req.cookies.token;

            const decodedToken = jwtDecode(token);
            const uid = decodedToken.id;

            const ticket = await cartService.purchase(cid, uid);

            res.sendSuccess(ticket);

        } catch (err){
            console.log(err.message)
            res.sendInternalServerError(err.message);
        }
    }

    increaseQuantityFromProduct = async (req, res) => {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;

            const quantity = req.body.quantity;
            
            const newCart = await cartService.increaseQuantityFromProduct(cid, pid, quantity);
            res.sendSuccess(newCart);

        } catch (err){
            res.sendBadRequest(err.message)        
        }
    };

    replaceCart = async (req, res) => {
        try{
            const cid = req.params.cid;
            const newCart = req.body;

            const cart = await cartService.replaceCart(cid, newCart);

            res.sendSuccess(cart);
            
        } catch (err){
            res.sendBadRequest(err.message)        
        }
    };

    deleteProductFromCart = async (req, res) => {
        try{
            const cid = req.params.cid;
            const pid = req.params.pid;

            const cart = await cartService.deleteProductFromCart(cid, pid);
            res.sendSuccess(cart);

        } catch (err) {
            res.sendBadRequest(err.message)        
        }
    };

    wipeProductsFromCart = async (req, res) => {
        try{
            const cid = req.params.cid;
            const cart = await cartService.wipeProductsFromCart(cid);

            res.sendSuccess(cart);

        } catch (err) {
            res.sendBadRequest(err.message)        
        }
    };
}