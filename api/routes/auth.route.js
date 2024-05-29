

const express = require('express');
const { Signup } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/',Signup);

module.exports = router;
