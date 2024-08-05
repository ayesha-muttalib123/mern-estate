import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { useParams } from "react-router-dom";

function Listing() {
  const { listingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listing, setListing] = useState(null);

  console.log("Listing ID:", listingId);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/listing/get/${listingId}`);
        const data = await response.json();

        if (!data || data.success === false) {
          setError("Listing not found");
          setLoading(false);
          return;
        }

        setListing(data.listings);
        setError(null);
        setLoading(false);
      } catch (error) {
        setError("Error fetching listing");
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  useEffect(() => {
    console.log("Fetched listing:", listing);
  }, [listing]);

  return (
    <div>
      {loading ? (
        <div className="text-center text-green-700 text-2xl m-7 font-bold">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-red-700 text-2xl m-7 font-bold">
          Error: {error}
        </div>
      ) : (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className=""
                  style={{
                    background: `url(${url}) center/cover no-repeat`,
                    height: "300px", // Adjust height as needed
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}

export default Listing;
