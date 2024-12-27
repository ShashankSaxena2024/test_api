const express = require('express');
const { createItem, updateItem , deleteItem, getItem} = require('../controllers/itemController');
const auth = require('../middlewares/auth');
const itemRouter = express.Router();




itemRouter.get('/', auth, getItem);
itemRouter.post('/', auth, createItem);
itemRouter.delete('/:id', auth, deleteItem);
itemRouter.put('/:id', auth, updateItem);


module.exports = itemRouter;