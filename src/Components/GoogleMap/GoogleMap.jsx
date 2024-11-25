import React, { useEffect, useRef } from "react";

const GoogleMap = () => {
    const mapRef = useRef(null)
    useEffect(() => {

    // Initialize the Google Map
    const initializeMap = () => {
      const map = new google.maps.Map(mapRef.current, {
        center: {
          lat:  23.756724360562256, // will be on housing based 
          lng:  90.35648582209016,
        }, // Default center (or fetched from property)
        zoom: 18,
      });

      // Add a marker
      new google.maps.Marker({
        position: {
          lat:  23.756724360562256,
          lng:  90.35648582209016,
        },
        map,
        // title: property.title || "Default Location",
      });
    };

    // Load the Google Maps script dynamically
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyABnAbo9ifTK9aGO-2oBameLdIKPxVKoXI&libraries=places";
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
        }}
        className=""
      ></div>
    </>
  );
};

export default GoogleMap;
