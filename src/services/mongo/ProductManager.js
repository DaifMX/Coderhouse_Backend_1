import validate from "../../schemas/ProductSchema.js";
import ProductModel from "./models/ProductModel.js";

export default class ProductManager {
    getAll = (limit, pageNumber) => {
        return ProductModel.paginate({}, {page: pageNumber, limit: limit});
    };

    getByCode = (code) => {
        return ProductModel.findOne({code: code});
    };

    create = (product) => {
        const validatedProduct = validate(product);
        return ProductModel.create(validatedProduct);
        
    };

    update = (code, product) => {
        const validatedProduct = validate(product, true);
        return ProductModel.findOneAndUpdate({code: code}, {$set: validatedProduct}, {new: true});
    };

    remove = async (code) => {
        const res = await ProductModel.findOneAndDelete({code: code});
        return res;
    }
}
