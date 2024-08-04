import {Router} from 'express';
import ProductService from '../services/ProductService.js';
import ProductController from '../controllers/ProductController.js';
import { upload } from '../utils.js';

//------------------------------------------------------
const router = Router();
const service = new ProductService();
const controller = new ProductController(service);

//GET
router.get('/', controller.getAll); //Obtener todos
router.get('/:code/', controller.getByCode); //Obtener el producto por ID

//POST
router.post('/', upload.none(), controller.create); //Ingresar un producto

//PUT
router.put('/:code', controller.update); //Actualizar un producto

//DELETE
router.delete('/:code', controller.remove); //Remover un producto

export default router;