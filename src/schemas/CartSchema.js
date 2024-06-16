import Joi from "joi";

const validate = (product, isUpdate = false) => {
    const tailor = isUpdate ? 'update' : 'save';

    const schema = Joi.object({
        cid: Joi.number()
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),

        products: Joi.array()
            .items(Joi.object({
                pid: Joi.number().greater(0).required(),
                quantity: Joi.number().min(1).required(),
            }))
            .required(),
    });

    const { error, value } = schema.tailor(tailor).validate(product);
    
    if(error){
        console.error('Validation Error:', error.message);
        throw new Error(error.message.replaceAll('"',''));
    }
    
    return value;
}

export default validate;