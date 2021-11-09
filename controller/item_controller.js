const Item = require('../schema/item_schema')
const itemValidation = require('../validation/item_validation')
const itemModel = require('../model/item_model')

//index, no auth
exports.index = (req, res) => {
    return res.status(200).json({
        message: 'You are at the root of item controller'
    })
}
//no auth
exports.getAll = async (req, res) => {
    try{
        const results = await itemModel.getAll()
        if (!results) {
            console.log('No results found')
            return res.status(404).json({
                message: 'No results found!'
            })
        }
        res.status(200).json(results)
    }catch (e) {
        console.log('Server Error: Cannot complete Find operation')
        res.status(500).json({message: 'Server Error: Cannot complete Find operation'})
    }
}

//requires auth
exports.postItem = async (req, res) => {

}
//requires auth
exports.editItem = async (req, res) => {

}
//requires auth
exports.deleteItem = async (req, res) => {

}