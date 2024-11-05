// src/Models/DetailsPropertyModel/DetailsPropertyModel.js

class DetailsPropertyModel {
    constructor(data) {
      this.title = data.title || "N/A";
      this.images = data.images || [];
      this.description = data.description || "No description available.";
      this.amenities = data.amenities || "No amenities listed for this property.";
      this.location_details = data.location_details || "No additional location details available.";
      this.division = data.division || { name: "N/A" };
      this.district = data.district || { name: "N/A" };
      this.upazila = data.upazila || { name: "N/A" };
      this.housing = data.housing || { name: "N/A" };
      this.road = data.road || "N/A";
      this.block = data.block || "N/A";
      this.plot = data.plot || "N/A";
      this.total_price = data.total_price || "Upcoming";
      this.no_of_beds = data.no_of_beds || "N/A";
      this.no_of_baths = data.no_of_baths || "N/A";
      this.rate_per_sqft = data.rate_per_sqft || "N/A";
      this.plot_size = data.plot_size || "N/A";
      this.floor_area = data.floor_area || "N/A";
      this.floor_no = data.floor_no || "N/A";
      this.project_image = data.project_image || "";
    }
  }
  
  export default DetailsPropertyModel;
  