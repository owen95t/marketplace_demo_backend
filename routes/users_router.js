const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user_controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router
    .route('/create')
    .post(user_controller.createUser)

module.exports = router;
