import BaseRouter from './BaseRouter.js';
import ProductController from '../controllers/ProductController.js';
import { upload } from '../utils.js';

//------------------------------------------------------

const controller = new ProductController();

export default class ProductRouter extends BaseRouter{
    init(){
        //GET
        this.get('/', ['USER'], controller.getAll); //Obtener todos
        this.get('/:code/', ['USER'], controller.getByCode); //Obtener el producto por ID

        //POST
        this.post('/', ['ADMIN'], upload.none(), controller.create); //Ingresar un producto

        //PUT
        this.put('/:code', ['ADMIN', 'USER'], controller.update); //Actualizar un producto

        //DELETE
        this.delete('/:code', ['ADMIN'], controller.remove); //Remover un producto
    }
}