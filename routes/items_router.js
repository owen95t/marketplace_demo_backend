const express = require('express');
const router = express.Router();
const item_controller = require('../controller/item_controller')

//API index
router
    .get('/', (req, res) => {
        return res.status(200).json({message: 'You are at the root of items'})
    })

//Get All for homepage
router
    .route('/getAll') //items/getAll
    .get(item_controller.getAll)

//Get user items
router
    .route('/get')
    .get(item_controller.getUserItems)

//Post new Item
router
    .route('/post')
    .post(item_controller.postItem)


//Delete user items
router
    .route('/delete')
    .delete(item_controller.deleteItem)

//Edit Items
router
    .route('/edit')
    .put(item_controller.editItem)


module.exports = router;