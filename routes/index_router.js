var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({message: 'You are at the root of the api'})
})

module.exports = router;
