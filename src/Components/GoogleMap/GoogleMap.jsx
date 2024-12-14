import React, { useEffect, useRef } from "react";

const GoogleMap = ({ property ,facility }) => {
  const mapRef = useRef(null);
console.log(facility);
console.log(property);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      // Check if the script is already loaded
      if (window.google && window.google.maps) {
        initializeMap();
      } else {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyABnAbo9ifTK9aGO-2oBameLdIKPxVKoXI&libraries=places&callback=initMap";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        window.initMap = initializeMap; // Ensure initMap is called after the script loads
      }
    };

    const initializeMap = () => {
      
      const lat = Number(property?.latitude )|| 23.756724360562256;
      const lng = Number(property?.longitude )|| 90.35648582209016;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 18,
      });

      // Use the standard marker if AdvancedMarkerElement is unavailable
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: "Property Location",
      });
    };

    loadGoogleMapsScript();

    return () => {
      // Cleanup the map script from the DOM when the component unmounts
      const script = document.querySelector('script[src*="maps/api/js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [property]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
      }}
    ></div>
  );
};

export default GoogleMap;
