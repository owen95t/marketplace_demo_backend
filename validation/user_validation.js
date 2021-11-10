const joi = require('joi');

exports.registerValidation = (data) => {
    const schema = joi.object({
        email: joi.string()
            .email()
            .required()
            .lowercase(),
        password: joi.string()
            .min(6)
            .max(20)
            .required()
    })
    return schema.validateAsync(data)
}

exports.loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string()
            .email()
            .required()
            .lowercase(),
        password: joi.string()
            .min(6)
            .max(20)
            .required()
    })
    return schema.validateAsync(data)
}