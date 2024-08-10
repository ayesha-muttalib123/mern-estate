import React, { useEffect, useState } from "react";
import { FaLaptopMedical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Functional component for Search
function Search() {
  // State to manage form data and search criteria
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setlisting] = useState([]);
  const [sidebarData, setSidebarData] = useState({
    SearchTerm: "", // Search term input value
    offer: false, // Checkbox for offers
    parking: false, // Checkbox for parking
    furnished: false, // Checkbox for furnished
    type: "all", // Type of listing (e.g., all, rent, sale)
    sort: "createdAt", // Field to sort by
    order: "desc", // Sort order (ascending or descending)
  });

  // Log the current state for debugging purposes
  console.log(sidebarData);
console.log("listings:",listings)
  // Event handler to update state based on input changes
  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    // Update the type of listing based on checkbox selection
    if (id === "all" || id === "rent" || id === "sale") {
      setSidebarData({ ...sidebarData, type: id });
    }

    // Update the search term input field
    if (id === "searchTerm") {
      setSidebarData({ ...sidebarData, SearchTerm: value });
    }

    // Update amenities checkboxes (parking, furnished, offer)
    if (id === "parking" || id === "furnished" || id === "offer") {
      setSidebarData({ ...sidebarData, [id]: checked });
    }

    // Update sort options based on the selected value in the dropdown
    if (id === "sort_order") {
      // Correctly split the value to get sort and order
      const [sort, order] = value.split("_");
      setSidebarData((prevState) => ({
        ...prevState,
        sort,
        order,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const UrlParams = new URLSearchParams();
    
    // Convert boolean values to strings
    UrlParams.set("searchTerm", sidebarData.SearchTerm );
    UrlParams.set("offer", sidebarData.offer );
    UrlParams.set("parking", sidebarData.parking );
    UrlParams.set("furnished", sidebarData.furnished );
    UrlParams.set("type", sidebarData.type);
    UrlParams.set("sort", sidebarData.sort );
    UrlParams.set("order", sidebarData.order );
  
    const SearchQuery = UrlParams.toString();
    navigate(`/search?${SearchQuery}`);
  };
  
  
  // useeffect uuse krne ki wajah ye k me aik jagah serach kron like 3 hao search ba=r to har jagah change hona chye usk lia
  //me ye krngi
  useEffect(() => {
    const UrlParams = new URLSearchParams(location.search);
  
    const serachFormTermUrl = UrlParams.get("searchTerm");
    const offerUrl = UrlParams.get("offer");
    const parkingUrl = UrlParams.get("parking");
    const furnishedUrl = UrlParams.get("furnished");
    const typeUrl = UrlParams.get("type");
    const sortUrl = UrlParams.get("sort");
    const orderUrl = UrlParams.get("order");
  
    setSidebarData({
      SearchTerm: serachFormTermUrl || "",
      offer: offerUrl === "true" ? true : false,
      parking: parkingUrl === "true" ? true : false,
      furnished: furnishedUrl === "true" ? true : false,
      type: typeUrl || "all",
      sort: sortUrl || "createdAt", // Default value for sort
      order: orderUrl || "desc", // Default value for order
    });
  
    const fetchListings = async () => {
      setLoading(true);
      const SearchQuery = new URLSearchParams({
        searchTerm: sidebarData.SearchTerm,
        offer: sidebarData.offer ? "true" : "false",
        parking: sidebarData.parking ? "true" : "false",
        furnished: sidebarData.furnished ? "true" : "false",
        type: sidebarData.type,
        sort: sidebarData.sort,
        order: sidebarData.order
      }).toString();
      
      try {
        const response = await fetch(`/api/listing/get?${SearchQuery}`);
        const data = await response.json();
        setlisting(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchListings();
  }, [location.search]);
  useEffect(() => {
    console.log("Sort:", sidebarData.sort);
    console.log("Order:", sidebarData.order);
  }, [sidebarData.sort, sidebarData.order]);
  
  
  return (
    <div className="p-5 flex flex-col md:flex-row md:h-screen ">
      {/* Form container with vertical and horizontal layout */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border-b-2 md:border-r-2 md:min-h-screen p-5"
      >
        {/* Search Term Section */}
        <div className="flex gap-2 items-center p-7 border-b-2 md:border-b-0 md:border-r-2">
          <h1 className="font-bold whitespace-nowrap">Search Term:</h1>
          <input
            type="text"
            className="w-full h-10 p-2 border rounded-lg"
            value={sidebarData.SearchTerm} // Bind the input value to the state
            onChange={handleChange} // Bind the change event handler
            id="searchTerm" // ID for the input field
            name="searchTerm" // Name attribute for the input field
            placeholder="Search..."
          />
        </div>

        {/* Type Checkboxes Section */}
        <div className="flex flex-col gap-4 p-3">
          <div className="font-bold flex flex-wrap gap-3">
            <h1>Type:</h1>
            {/* Checkbox for "Rent & Sale" */}
            <label className="font-semibold flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 mr-2"
                id="all" // ID for this checkbox
                checked={sidebarData.type === "all"} // Check if the current type is 'all'
                onChange={handleChange} // Bind the change event handler
              />
              Rent & Sale
            </label>
            {/* Checkbox for "Offer" */}
            <label className="flex font-semibold items-center">
              <input
                id="offer"
                type="checkbox"
                className="w-5 h-5 mr-2"
                checked={sidebarData.offer} // Check if 'offer' is true
                onChange={handleChange} // Bind the change event handler
              />
              Offer
            </label>
            {/* Checkbox for "Rent" */}
            <label className="flex font-semibold items-center">
              <input
                id="rent"
                type="checkbox"
                className="w-5 h-5 mr-2"
                checked={sidebarData.type === "rent"} // Check if the current type is 'rent'
                onChange={handleChange} // Bind the change event handler
              />
              Rent
            </label>
            {/* Checkbox for "Sale" */}
            <label className="flex font-semibold items-center">
              <input
                id="sale"
                type="checkbox"
                className="w-5 h-5 mr-2"
                checked={sidebarData.type === "sale"} // Check if the current type is 'sale'
                onChange={handleChange} // Bind the change event handler
              />
              Sale
            </label>
          </div>

          {/* Amenities Checkboxes Section */}
          <div className="flex font-bold flex-wrap gap-3">
            <h1>Amenities:</h1>
            {/* Checkbox for "Parking" */}
            <label className="flex font-semibold items-center">
              <input
                id="parking"
                type="checkbox"
                className="w-5 h-5 mr-2"
                checked={sidebarData.parking} // Check if 'parking' is true
                onChange={handleChange} // Bind the change event handler
              />
              Parking
            </label>
            {/* Checkbox for "Furnished" */}
            <label className="flex font-semibold items-center">
              <input
                id="furnished"
                type="checkbox"
                className="w-5 h-5 mr-2"
                checked={sidebarData.furnished} // Check if 'furnished' is true
                onChange={handleChange} // Bind the change event handler
              />
              Furnished
            </label>
          </div>

          {/* Sort Options Section */}
          <div className="flex flex-col gap-5 mt-4">
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="font-semibold mr-2">
                Sort:
              </label>
              <select
  onChange={handleChange}
  id="sort_order"
  className="border rounded-lg p-2"
  value={sidebarData.sort + "_" + sidebarData.order} // Ensure this value matches the dropdown
>
  <option value="regularPrice_desc">Price high to low</option>
  <option value="regularPrice_asc">Price low to high</option>
  <option value="createdAt_desc">Latest</option>
  <option value="createdAt_asc">Oldest</option>
</select>


            </div>

            {/* Search Button */}
            <button className="uppercase bg-slate-700 text-white p-3 rounded-lg w-full mt-4">
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Listing Results Section */}
      <div className="flex-grow p-5">
        <h1 className="font-bold text-2xl">Listing Results:</h1>
      </div>
    </div>
  );
}

export default Search;
