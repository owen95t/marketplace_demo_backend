const Item = require('../schema/item_schema')
const itemValidation = require('../validation/item_validation')

//GET all item for homepage
exports.getAll = async () => {
    return await Item.find()
}

//GET user's items
exports.getUsersItems = async (user_id) => {
    return await Item.find({user_id: user_id})
}

//POST Item
exports.postItem = async (data) => {
    //Data validation
    const {error} = await itemValidation.postItemValidation(data)
    if (error) {
        console.log('Error posting new item due to wrong input: ' + error)
        return Promise.reject(error)
    }

    //Create newItem variable
    const newItem = new Item(data);
    //return Promise save
    return await newItem.save()
}

//DELETE Item
exports.deleteItem = async (item_id) => {
    //Should first check to see if item exists?
    return await Item.findOneAndDelete({_id: item_id})
}

//PUT update item
exports.editItem = async (data) => {
    //Data validation
    const {error} = await itemValidation.editItemValidation(data)
    if (error){
        console.log(error)
        return Promise.reject(error)
    }
    //Assign item id
    const item_id = data._id
    //try catch for promises
    try{
        //this Promise still resolves despite failing to update??
        return await Item.findOneAndUpdate({_id: item_id}, data)
    }catch (e) {
        console.log('Failed to edit item: ' + e)
    }
}

