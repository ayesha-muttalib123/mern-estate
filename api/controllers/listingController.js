
const Listing = require('../models/Listing.model');


exports.createListing = async (req, res) => {
    try {
      console.log("Form Data received by backend:", req.body);
    const { name, description, regularPrice, address, furnished, parking, type, bathroom, bedrooms, offer, discountedPrice, imageUrls, userRefs } = req.body.formData;
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
    console.log("new l;istings"+newListing)
   
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

exports.deleteListing=async(req,res)=>{

  const listings=await Listing.findById(req.params.id)

if(!listings){
  return res.status(404).json({success:false,message:"Listing not found"})


  }

  if(req.user.id !== listings.userRefs.toString()){
    return res.status(401).json({success:false,message:"you can delete your own listings"})
  }

  try {
    await Listing.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    
  }
}