const itemModel = require('../model/item_model')


exports.index = (req, res) => {
    return res.status(200).json({
        message: 'You are at the root of item controller'
    })
}

exports.getAll = async (req, res) => {
    try{
        const results = await itemModel.getAll()
        if (results.length === 0) {
            console.log('No results found')
            return res.status(404).json({
                message: 'No results found!'
            })
        }
        res.status(200).json(results)
    }catch (e) {
        console.log('Server Error: Cannot complete Find operation' + e)
        res.status(500).json({message: 'Server Error: Cannot complete Find operation'})
    }
}

//EVERYTHING BELOW REQUIRES AUTH

exports.getUserItems = async (req, res) => {
    let user_id = req.session.uid

    await itemModel.getUsersItems(user_id).then((results) => {
        if (!results) {
            console.log('This user has no items')
            return res.status(200).json({message: 'This user has no items!'})
        }
        return res.status(200).json(results)
    }).catch(e => {
        if (e) {
            console.log(e);
            return res.status(500).json({message: `Error retrieving user this user's items`})
        }
    })
}

//requires auth
exports.postItem = async (req, res) => {
    console.log(req.body)
    let uid = req.session.uid
    await itemModel.postItem(req.body, uid).then((results) => {
        return res.status(201).json({message: 'New item created successfully!'});
    }).catch(e => {
        if (e) {
            console.log('Error creating new item')
            return res.status(400).json({message: 'Error creating new item: ' + e})
        }
    })
}

//requires auth
exports.editItem = async (req, res) => {
    console.log('Edit item: ' + JSON.stringify(req.body))

    try{
        let results = await itemModel.editItem((req.body))
        console.log('Results: ' + results)
        if (!results) {
            console.log('No item was edited')
        }
        console.log('Edited Successfully');
        return res.status(200).json({message: 'Item edited successfully'})
    }catch (e) {
        console.log(e)
        return res.status(400).json({message: 'Error updating item: ' + e})
    }
}

//requires auth
exports.deleteItem = async (req, res) => {
    console.log('Delete Item: ' + JSON.stringify(req.body))

    await itemModel.deleteItem(req.body.item_id).then((results) => {
        if (!results) { //if no results == nothing was deleted as it will return the item deleted if item is found
            console.log('No item was deleted')
            return res.status(200).json({message: 'No item was deleted'})
        }
        console.log('Item deleted successfully');
        return res.status(200).json({message: 'Item deleted successfully!'})
    }).catch(e => {
        if (e) {
            console.log('Error deleting item: ' + e)
            return res.status(500).json({message: 'Error deleting Item: ' + e})
        }
    })
}