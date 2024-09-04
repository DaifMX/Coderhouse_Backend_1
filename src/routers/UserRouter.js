import BaseRouter from './BaseRouter.js';
import UserController from '../controllers/UserController.js';

//------------------------------------------------------
const controller = new UserController();

export default class UserRouter extends BaseRouter{
    init(){
        //GET
        this.get('/', ['PUBLIC'], controller.getAll); //Obtener todos
        this.get('/getByEmail', ['PUBLIC'], controller.getByEmail); //Obtener un usuario con por email

        //POST
        this.post('/', ['PUBLIC'], controller.create); //Crear un nuevo usuario
        //this.post('/:cid', [], controller.joinCart); //Adjuntar un carrito un usuario

        //PUT
        //this.put('/:email', [], controller.update); //Actualizar un usuario

        //DELETE
        //this.put('/:email', [], controller.remove); //Remover un usuario
    }
}