const joi = require('joi');

exports.itemValidation = (data) => {
    const schema = joi.object({
        item_name: joi.string()
            .max(50) //max 50 chars
            .required(),
        item_desc: joi.string()
            .max(300) //max 300 chars
            .required(),
        item_price: joi.number()
            .greater(0) //greater tha 0
            .precision(2), //decimal points up to 2
        item_discount: joi.boolean()
            .required()
            .default(false),
        item_owner_id: joi.string()
            .required(),
        date_created: joi.date() //may need review
            .required(),
        item_status: joi.boolean() //show hide status
            .required()
            .default(true), //default is true meaning show
        item_rating: joi.number()
            .integer() //requires it to be integer
            .max(5) //max of 5
            .min(0) //min of 0
            .default(0) //default at 0
    })
    return schema.validate(data)
}