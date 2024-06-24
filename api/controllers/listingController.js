
const ListingModel = require('../models/Listing.model');

exports.createListing = async (req, res) => {
    try {
        const listing = await ListingModel.create(req.body)
        console.log("listing are :"+listing)
        res.status(201).json(listing);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: "Failed to create listing", error });
    }
};
