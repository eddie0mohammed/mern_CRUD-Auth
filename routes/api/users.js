
const express = require('express');

const userController = require('../../controllers/userControllers');


const router = express.Router();


// @route   PORT /api/users
// @desc    Create user
// @access  Public
router.post('/', userController.createUser);



module.exports = router;