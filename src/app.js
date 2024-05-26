import express from 'express';
import ProductRouter from './routers/ProductRouter.js'
import CartRouter from './routers/CartRouter.js'

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static('./src/public'));
app.use(express.json())

app.use('/api/carts', CartRouter);
app.use('/api/products', ProductRouter);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});