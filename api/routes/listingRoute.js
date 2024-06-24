const express=require('express');
const { createListing } = require('../controllers/listingController');
const { verifyUser } = require('../middleware/verifyuser');


const router = express.Router();

router.post('/create',verifyUser,createListing)

module.exports=router