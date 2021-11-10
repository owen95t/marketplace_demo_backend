const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user_controller')

/* GET users listing. */
router
    .route('/')
    .get((req, res) => {
      return res.status(200).json({message: 'You are at the root of users API'})
    })

router
    .route('/register')
    .post(user_controller.createUser)

router
    .route('/login')
    .post(user_controller.login)

router
    .route('/logout')
    .post(user_controller.logout)

module.exports = router;
