import * as Joi from 'joi';


//TODO Se usa este para que antes de que se inicie la aplicacion se valide que existan estas variales de entorno
export const JoiVlidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005), 
})
