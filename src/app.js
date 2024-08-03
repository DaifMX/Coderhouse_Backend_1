import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io'
import "dotenv/config"
import mongoose from 'mongoose';
import ProductRouter from './routers/ProductRouter.js';
import CartRouter from './routers/CartRouter.js';
import ViewRouter from './routers/ViewRouter.js';
import {__dirname} from './utils.js';

// -------------------------------------------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 8080;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING);

const server = app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
const io = new Server(server);

//Motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//Middlewares de Express
app.use(express.static('./src/public'));
app.use((req,res,next) =>{req.io=io; next();});
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas
app.use('/api/carts', CartRouter);
app.use('/api/products', ProductRouter);
app.use('/', ViewRouter);

io.on('connection', socket => {
    console.log('Socket connected');
});