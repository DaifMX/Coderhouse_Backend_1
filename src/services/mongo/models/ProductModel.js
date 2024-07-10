import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'Products';

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    code:{
        type: String,
        required: true,
        unique: true,
    },

    price:{
        type: Number,
        required: true,
    },

    status:{
        type: Boolean,
        default: true,
        required: false,
    },

    stock:{
        type: Number,
        required: true,
    },

    category:{
        type: String,
        required: true,
    },

    thumbnails: {
        type: [{ type: String }],
        required: false,
    }       
});

schema.plugin(mongoosePaginate);

const ProductModel = mongoose.model(collection, schema);

export default ProductModel;