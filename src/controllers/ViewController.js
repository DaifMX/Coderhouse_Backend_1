import ProductController from "./ProductController.js";

//------------------------------------------------------
export default class ViewController {
    home = (req, res) => {
        const controller = new ProductController();
        const products = controller.getAll();

        //Nombre de la plantilla de handlebars
        res.render('Home', {
            title: 'Productos',
            products
        });
    };

    realTimeProducts = (req, res) => {
        const products = getAll();

        res.render('RealTimeProducts', {
            title: 'Productos (RealTime)',
            products
        })
    };
}