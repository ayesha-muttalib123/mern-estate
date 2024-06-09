const express = require('express');
const { createUser, updateUser } = require('../controllers/user.controller');
const { verifyUser } = require('../middleware/verifyuser');
const router = express.Router();

router.get('/', createUser);
router.post('/update/:id', verifyUser, updateUser);

module.exports = router;
