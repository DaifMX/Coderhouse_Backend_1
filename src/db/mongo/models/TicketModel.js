import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = 'Tickets';

const schema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        unique: true,
    },

    amount:{
        type: Number,
        required: true,
    },

    purchaser:{
        type: String,
        required: true,
    },
},
{
    timestamps: {createdAt: 'purchase_datetime'}
});

schema.plugin(mongoosePaginate);

const TicketModel = mongoose.model(collection, schema);

export default TicketModel;