
const Listing = require('../models/Listing.model');


exports.createListing = async (req, res) => {
    try {
      console.log("Form Data received by backend:", req.body);
    const { name, description, regularPrice, address, furnished, parking, type, bathroom, bedrooms, offer, discountedPrice, imageUrls, userRefs } = req.body;
    console.log("Form Data received by backend:", req.body);
    const newListing = new Listing({
      name,
      description,
      regularPrice,
      address,
      furnished,
      parking,
      type,
      bathroom,
      bedrooms,
      offer,
      discountedPrice,
      imageUrls,
      userRefs
    });

    await newListing.save();
    res.json({ success: true, _id: newListing._id });
   
  } catch (error) {
    console.error("Error saving listing:", error);
    res.json({ success: false, message: error.message });
  }
};



// const ListingModel = require('../models/Listing.model');

// exports.createListing = async (req, res) => {
//     try {
//         const listing = await ListingModel.create(req.body);
//         console.log("Listing created:", listing);
//         res.status(201).json({
//             success: true,
//             data: listing
//         });
//     } catch (error) {
//         console.error("Error creating listing:", error); // Log the error for debugging
//         res.status(400).json({
//             success: false,
//             message: "Failed to create listing",
//             error: error.message // Send the error message in the response
//         });
//     }
// };

