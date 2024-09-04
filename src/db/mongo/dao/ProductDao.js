import validate from "../../../schemas/ProductSchema.js";
import ProductModel from "../models/ProductModel.js";

//------------------------------------------------------
export default class ProductDao {
    get = async (params) => await ProductModel.findOne(params);
    
    paginate = async (page, limit) => await ProductModel.paginate({}, {page, limit})

    create = async (...params) => {
        const validatedProduct = validate(...params);
        return await ProductModel.create(validatedProduct);
    }

    update = async (id, ...params) => {
        const validatedProduct = validate(...params, true);
        return await ProductModel.findOneAndUpdate({code: id}, {$set: validatedProduct}, {new: true});
    }

    remove = async (id) => await ProductModel.findOneAndDelete(id);
}
