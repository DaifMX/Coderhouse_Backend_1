import {Router} from 'express';
import * as Service from '../services/ProductService.js'
import ProductController from '../controllers/ProductController.js';
import { upload } from '../utils.js';

//===============NOTA===============//
//Para tener de manera más prolija mi proyecto, decidí tener mis logicas por separado
//No queria tener la logica de que codigo de HTTP y todo el servicio en mismo lugar.
//Hacer esto haria que tuviera un router muy largo por lo cual me parece inpractico

//El controlador sería el encargado de hacer llamadas a un nuestra servicio.
//El service sería el encargado de sobrellevar toda la logica que necesita llevarse para poder entregar nuestras solicitudes al JSON.

const router = Router();
const controller = new ProductController(Service);

//GET
router.get('/', controller.getAll); //Obtener todos
router.get('/:pid', controller.getByPid); //Obtener el producto por ID

//POST
router.post('/', upload.none(), controller.create); //Ingresar un producto

//PUT
router.put('/:pid', controller.update); //Actualizar un producto

//DELETE
router.delete('/:pid', controller.remove); //Remover un producto

export default router;