let express = require('express');
let router = express.Router();

//Get all items for homepage
router
    .route('/getAll')
    .get()

//Get user items
router
    .route('/get')
    .get()

//Delete user items
router
    .route('/deleteItem')
    .delete()

//Post new Item
router
    .route('/new')
    .post()


module.exports = router;