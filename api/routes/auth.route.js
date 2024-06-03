

const express = require('express');
const { Signup, SignIn, SignInWithGoogle } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup',Signup);
router.post('/signin',SignIn);
router.post('/google',SignInWithGoogle);



module.exports = router;
