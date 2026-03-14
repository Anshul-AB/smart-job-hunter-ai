const express = require('express')
const router = express.Router()

const signUp = '../controllers/authController.js';

router.post('/signUp', signUp)

module.exports = router;
