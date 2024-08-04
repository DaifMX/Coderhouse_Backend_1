import Joi from "joi";

//------------------------------------------------------
const validate = (product, isUpdate = false) => {
    const tailor = isUpdate ? 'update' : 'save';

    const schema = Joi.object({
        first_name: Joi.string()
            .pattern(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]{1,50}$/)
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
    
        last_name: Joi.string()
            .pattern(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]{1,50}$/)
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
        }),
    
        email: Joi.string()
            .email()
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
    
        age: Joi.number()
            .positive()
            .greater(15)
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
    
        password: Joi.string()
            .alter({
                save: (schema) => schema.required(),
                update: (schema) => schema.optional()
            }),
    
        cartId: Joi.number()
            .positive()
            .optional(),
        
        role: Joi.string().default('user')
    });

    const { error, value } = schema.tailor(tailor).validate(product);
    
    if(error){
        console.error('Validation Error:', error.message);
        throw new Error(error.message.replaceAll('"',''));
    }
    
    return value;
}

export default validate;