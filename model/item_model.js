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

exports.getByID = async (id) => {
    return await Item.findById({_id: id})
}

//POST Item
exports.postItem = async (data, uid) => {
    //Data validation
    //data["user_id"] = uid

    const newItem = new Item({
        item_name: data.item_name,
        item_desc: data.item_desc,
        item_price: data.item_price,
        item_discount: data.item_discount,
        item_owner_id: uid,
        date_created: Date.now(),
        item_status: true,
        item_rating: 0,
        user_id: uid
    })


    console.log(newItem)
    // const {error} = await itemValidation.postItemValidation(newItem)
    // if (error) {
    //     console.log('Error posting new item due to wrong input: ' + error)
    //     return Promise.reject(error)
    // }

    //Create product variable
    // const product = new Item(newItem);
    //return Promise save
    return await newItem.save()
}

//DELETE Item
exports.deleteItem = async (item_id) => {
    //Should first check to see if item exists?
    console.log('ITEM TO DELETE ID: ' + item_id)
    return await Item.findOneAndDelete({_id: item_id})
}

//PUT update item
exports.editItem = async (data) => {
    console.log('data: ' + JSON.stringify(data))
    //Data validation
    // const {error} = await itemValidation.editItemValidation(data)
    // if (error){
    //     console.log(error)
    //     return Promise.reject(error)
    // }
    // if (data.user_id !== uid) {
    //     return Promise.reject('You are not allowed to edit this item.')
    // }

    //Assign item id
    const item_id = data.item_id;
    console.log(item_id)
    //try catch for promises

    //this Promise still resolves despite failing to update??
    return await Item.findOneAndUpdate({_id: item_id}, data.editedData)

}

