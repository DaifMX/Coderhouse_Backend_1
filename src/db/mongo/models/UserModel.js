import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'Users';

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    age:{
        type: Number,
        required: true,
    },

    password:{
        type: String,
        required: false,
    },

    cart:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Carts',
        required: false,
    },

    role:{
        type: String,
        required: true,
        default: 'user'
    },     
});

schema.plugin(mongoosePaginate);

const UserModel = mongoose.model(collection, schema);

export default UserModel;