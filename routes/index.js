const express = require('express');
const router = express.Router();

const user = require('./auth')
router.use('/user', user)

const todo = require('./todo')
router.use('/Todo', todo)




module.exports = router