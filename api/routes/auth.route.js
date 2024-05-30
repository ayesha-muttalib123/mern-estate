

const express = require('express');
const { Signup, SignIn } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup',Signup);
router.post('/signin',SignIn);


module.exports = router;
