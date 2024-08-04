import {Router} from 'express';
import UserController from '../controllers/UserController.js';
import UserService from '../services/UserService.js';

//------------------------------------------------------
const router = Router();
const service = new UserService()
const controller = new UserController(service);

//GET
router.get('/', controller.getAll); //Obtener todos
router.get('/getByEmail', controller.getByEmail); //Obtener un usuario con por email

//POST
router.post('/', controller.create); //Crear un nuevo usuario
//router.post('/:cid', controller.joinCart); //Adjuntar un carrito un usuario

//PUT
//router.put('/:email', controller.update); //Actualizar un usuario

//DELETE
//router.put('/:email', controller.remove); //Remover un usuario

export default router;
