const express = require('express');
const router = express.Router();
const controller = require('../controllers/todo')
const authenticateToken = require('../middleware/token');

router.post('/todos',authenticateToken , controller.createTodo)
router.get('/todos'  ,authenticateToken,controller.getAllTodo)
router.put('/todos/:id',authenticateToken, controller.updateTodo)
router.delete('/todos/:id',authenticateToken, controller.deleteTodo)


 module.exports = router