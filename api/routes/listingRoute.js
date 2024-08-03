const express=require('express');
const { createListing, deleteListing, updateListing } = require('../controllers/listingController');
const { verifyUser } = require('../middleware/verifyuser');


const router = express.Router();

router.post('/create',verifyUser,createListing)
router.delete('/delete/:id',verifyUser,deleteListing)
router.post('/update/:id',verifyUser,updateListing)


module.exports=router