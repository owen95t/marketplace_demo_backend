const express = require('express');
const router = express.Router();
const item_controller = require('../controller/item_controller')
const auth = require('../auth/verify_sessions')

//API index
router
    .get('/', (req, res) => {
        return res.status(200).json({message: 'You are at the root of items'})
    })

//Get All for homepage
router
    .route('/getAll') //items/getAll
    .get(item_controller.getAll)

//Get by ID
router
    .route('/getID/:id')
    .get(item_controller.getByID)

//Get user items
router
    .route('/getUserItems')
    .get(auth, item_controller.getUserItems)

//Post new Item
router
    .route('/post')
    .post(auth, item_controller.postItem)

//Delete user items
router
    .route('/delete')
    .delete(auth, item_controller.deleteItem)

//Edit Items
router
    .route('/edit')
    .put(auth, item_controller.editItem)


module.exports = router;