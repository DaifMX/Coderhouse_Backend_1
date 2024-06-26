import { getAll } from "../services/ProductService.js";

class ViewController {
    home = (req, res) => {
        const products = getAll();

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

export default ViewController;