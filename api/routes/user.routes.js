const express = require('express');
const { Createuser } = require('../controllers/user.controller');
const router = express.Router();

router.get('/',Createuser);

module.exports = router;
