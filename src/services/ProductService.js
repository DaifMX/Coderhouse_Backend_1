import validate from "../schemas/ProductSchema.js";
import ProductModel from "../db/mongo/models/ProductModel.js";

//------------------------------------------------------
export default class ProductService {
    getAll = (limit, pageNumber) => ProductModel.paginate({}, {page: pageNumber, limit: limit});

    getByCode = (code) => ProductModel.findOne({code: code});

    create = (product) => {
        const validatedProduct = validate(product);
        return ProductModel.create(validatedProduct);
    };

    update = (code, product) => {
        const validatedProduct = validate(product, true);
        return ProductModel.findOneAndUpdate({code: code}, {$set: validatedProduct}, {new: true});
    };

    remove = async (code) => await ProductModel.findOneAndDelete({code: code});
}
