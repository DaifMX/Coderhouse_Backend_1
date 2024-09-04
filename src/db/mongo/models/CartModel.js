import mongoose from 'mongoose';

const collection = 'Carts';

const schema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Products',
        required: true,
      },
      
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

schema.pre(['find', 'findOne', 'findById'], function () {
  this.populate('products.product');
});

const CartModel = mongoose.model(collection, schema);

export default CartModel;