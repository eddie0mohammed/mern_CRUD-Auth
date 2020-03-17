
const express = require('express');

const itemController = require('../../controllers/itemController');

const checkAuth = require('../../middleware/auth');


const router = express.Router();


// @route   GET /api/items
// @desc    Get all items
// @access  Public
router.get('/', itemController.getAllItems);


// @route   POST /api/items
// @desc    Create new item
// @access  Private
router.post('/', checkAuth, itemController.createItem);


// @route   DELETE /api/items/:id
// @desc    DELETE item
// @access  Private
router.delete('/:id', checkAuth, itemController.deleteItem);



module.exports = router;