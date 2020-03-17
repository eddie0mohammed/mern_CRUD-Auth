
const express = require('express');

const authController = require('../../controllers/authController');

const checkAuth = require('../../middleware/auth');

const router = express.Router();


// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', authController.login);



// @route   Get api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', checkAuth, authController.getUser);



module.exports = router;
