var express = require('express');
var router = express.Router();
const todolist = require('../controller/todolist'); 

/* GET home page. */
router.get('/', todolist.listTodolist);

module.exports = router;
