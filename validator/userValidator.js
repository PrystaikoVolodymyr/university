const Joi = require('joi');

module.exports = {
    createUser: Joi.object({
        name: Joi
            .string()
            .alphanum()
            .min(3)
            .max(60)
            .required(),
        email: Joi
            .string()
            .required()
            .regex(new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)),
        password: Joi
            .string()
            .required()
            .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))

    }),

    singIn: Joi.object({
        email: Joi
            .string()
            .required()
            .regex(new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)),
        password: Joi
            .string()
            .required()
            .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))
    }),

}
