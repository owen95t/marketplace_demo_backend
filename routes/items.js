let express = require('express');
let router = express.Router();

router
    .route('/getAll')
    .get()

router
    .route('/get')
    .get()

router
    .route('myItems')
    .get()



module.exports = router;