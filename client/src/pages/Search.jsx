import React from "react";

function Search() {
  return (
    <div className="p-5 flex flex-col md:flex-row md:h-screen ">
      <form className="flex flex-col gap-4 border-b-2 md:border-r-2 md:min-h-screen p-5">
        <div className="flex  gap-2 items-center p-7 border-b-2 md:border-b-0 md:border-r-2">
          <h1 className="font-bold whitespace-nowrap">Search Term:</h1>
          <input
            type="text"
            className="w-full h-10 p-2 border rounded-lg"
            id="search"
            name="search"
            placeholder="Search..."
          />
        </div>
        
        <div className="flex flex-col gap-4 p-3">
          <div className="font-bold flex flex-wrap gap-3">
          <h1>Type:</h1>
            <label className=" font-semibold flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              Rent & Sale
            </label>
            <label className="flex font-semibold items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              Offer
            </label>
            <label className="flex font-semibold items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              Rent
            </label>
            <label className="flex font-semibold items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              Sale
            </label>
          
          </div>
          <div className="flex font-bold flex-wrap gap-3">
            <h1>Amenities:</h1>

          <label className="flex font-semibold items-center ">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              Parking
            </label>
            <label className="flex font-semibold items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              Furnished
            </label>
          </div>

          <div className="flex flex-col gap-5 mt-4">
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="font-semibold mr-2">Sort:</label>
              <select
                id="sort"
                className="border rounded-lg p-2"
              >
                <option value="">Price high to low</option>
                <option value="">Price low to high</option>
                <option value="">Latest</option>
                <option value="">Oldest</option>
              </select>
            </div>
            
            <button className="uppercase bg-slate-700 text-white p-3 rounded-lg w-full mt-4">
              Search
            </button>
          </div>
        </div>
      </form>
      <div className="flex-grow p-5">
        <h1 className="font-bold text-2xl">Listing Results:</h1>
      </div>
    </div>
  );
}

export default Search;
