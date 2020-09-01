var express = require('express');
var router  = express.Router()

const {Homepage} = require('../controllers/Homepage')
router.get("/", Homepage);


module.exports = router;