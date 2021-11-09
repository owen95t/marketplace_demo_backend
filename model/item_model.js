const Item = require('../schema/item_schema')
const itemValidation = require('../validation/item_validation')

exports.getAll = async () => {
    return await Item.find().catch(e => {
        if (e) {
            console.log(e);
            return e
        }
    });
}