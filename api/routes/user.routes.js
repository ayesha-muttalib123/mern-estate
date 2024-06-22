const express = require('express');
const { createUser, updateUser, deleteUser, SignOut } = require('../controllers/user.controller');
const { verifyUser } = require('../middleware/verifyuser');
const router = express.Router();

router.get('/', createUser);
router.post('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser);



module.exports = router;
