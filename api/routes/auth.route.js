

const express = require('express');
const { Signup } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup',Signup);

module.exports = router;
