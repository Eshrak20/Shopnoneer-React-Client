// In your module file
export class Facility {
  constructor(data) {

    this.name =  data.name||"Unknown Facility";
    this.category_name =  data.category|| "Unknown Facility";
    this.latitude =  data.latitude|| "Unknown latitude";
    this.longitude =  data.longitude|| "Unknown longitude";
  }
}

export class Amenity {
  constructor(data) {

    this.name =  data.name||"Unknown Facility";
    this.web_icon =  data.web_icon|| "Unknown Facility";
  }
}

export class DetailsPropertyModel {
  constructor(data) {
    this.id = data.id || null;
    this.title = data.title || "Untitled Property";
    this.division = data.division || "Unknown Division";
    this.district = data.district || "Unknown District";
    this.upazila = data.upazila || "Unknown Upazila";
    this.latitude = data.latitude || "Unknown Housing";
    this.longitude = data.longitude || "Unknown Housing";
    this.housing = data.housing || "Unknown Housing";
    this.road = data.road || "N/A";
    this.block = data.block || "N/A";
    this.plot = data.plot || "N/A";
    this.plot_size = data.plot_size || 0;
    this.plot_face = data.plot_face || "Unknown";
    this.is_corner = data.is_corner || 0;
    this.storied = data.storied || 0;
    this.no_of_units = data.no_of_units || 0;
    this.floor_area = data.floor_area || 0;
    this.floor_no = data.floor_no || "N/A";
    this.no_of_beds = data.no_of_beds || 0;
    this.no_of_baths = data.no_of_baths || 0;
    this.no_of_balcony = data.no_of_balcony || 0;
    this.parking_available = data.parking_available || 0;
    this.owner_name = data.owner_name || "Unknown Owner";
    this.owner_phone = data.owner_phone || "N/A";
    this.owner_email = data.owner_email || "N/A";
    this.rate_per_sqft = data.rate_per_sqft || 0;
    this.total_price = data.total_price || null;
    this.description = data.description || "No description available.";
    this.google_map = data.google_map || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
    this.is_active = data.is_active || 0;
    this.images = data.images || [];

    // Initialize facilities array (if exists)
    // this.facilities = (data.facilities || []).map(facility => new Facility(facility));
  }

  static async fetchById(id) {
    const token = localStorage.getItem("user_token");

    try {
      const response = await fetch(
        "https://sna.shopnoneer.com/api/get-project-by-id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Correct template literal syntax
          },
          body: JSON.stringify({ project_id: id }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch project data.");

      const result = await response.json();

      const propertyModel = new DetailsPropertyModel(result.data);
      

      // Create the Facility model instances, if facilities exist
      const facilities = result.data.facilities || [];
      const facilityModel = facilities.map(facility => new Facility(facility));


      const amenity = result.data.amenities || [];
    //  console.log(amenity);
     
      const amenityModel = amenity.map(amenity => new Amenity(amenity));

      return {
        property: propertyModel,
        facilities: facilityModel,
        amenities: amenityModel,
      };

    } catch (error) {
      console.error("Error fetching property data:", error);
      throw error;
    }
  }
}
