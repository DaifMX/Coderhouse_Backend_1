import Joi from "joi";

const validate = (product, isUpdate = false) => {
    const tailor = isUpdate ? 'update' : 'save';

    const schema = Joi.object({
        pid: Joi.number()
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
    
        title: Joi.string()
            .min(8)
            .max(36)
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
    
        description: Joi.string()
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
        }),
    
        code: Joi.string()
            .min(2)
            .max(5)
            .alphanum()
            .uppercase()
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
    
        price: Joi.number()
            .positive()
            .greater(0)
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
    
        status: Joi.boolean()
            .truthy('yes', 'true', 't')
            .falsy('no', 'false', 'f')
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
    
        stock: Joi.number()
            .positive()
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
        
        category: Joi.string()
            .alphanum()
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
    
        thumbnails: Joi.array()
            .items(Joi.string())
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
    });

    const { error, value } = schema.tailor(tailor).validate(product);
    
    if(error){
        console.error('Validation Error:', error.message);
        throw new Error(error.message.replaceAll('"',''));
    }
    
    return value;
}

export default validate;