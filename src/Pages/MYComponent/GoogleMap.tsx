import type { Project } from "@/types/admin.type";
import React, { useEffect, useRef } from "react";
interface GoogleMapProps {
  property: Partial<Project> & {
    latitude?: number | string;
    longitude?: number | string;
  };
  facility?: string[];
}
const GoogleMap: React.FC<GoogleMapProps> = ({ property }) => {
  const mapRef = useRef(null);
  // const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      // Check if the script is already loaded
      if (window.google && window.google.maps) {
        initializeMap();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        window.initMap = initializeMap; // Ensure initMap is called after the script loads
      }
    };

    const initializeMap = () => {
      const lat = Number(property?.latitude) || 23.756724360562256;
      const lng = Number(property?.longitude) || 90.35648582209016;

      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 15,
        });

        new google.maps.Marker({
          position: { lat, lng },
          map,
          title: "Property Location",
        });
      }
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
