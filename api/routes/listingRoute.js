const express=require('express');
const { createListing, deleteListing } = require('../controllers/listingController');
const { verifyUser } = require('../middleware/verifyuser');


const router = express.Router();

router.post('/create',verifyUser,createListing)
router.delete('/delete/:id',verifyUser,deleteListing)

module.exports=router