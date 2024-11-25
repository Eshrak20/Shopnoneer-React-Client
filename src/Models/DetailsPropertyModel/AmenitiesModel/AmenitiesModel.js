// src/Models/AmenitiesModel/AmenitiesModel.js

class AmenitiesModel {
    constructor(id, name, icon) {
      this.id = id;
      this.name = name;
      this.icon = icon;
    }
  }
  
  export default AmenitiesModel;
  

  // Models/AmenityModel.js


  
// export default class AmenityModel {
//   constructor(data) {
//     this.id = data.id || null;
//     this.name = data.name || "Unnamed Amenity";
//     this.android_icon = data.android_icon || "faDefaultIcon";
//     this.ios_icon = data.ios_icon || "faDefaultIcon";
//     this.web_icon = data.web_icon || "faDefaultIcon";
//     this.created_at = data.created_at || null;
//     this.updated_at = data.updated_at || null;
//     this.pivot = data.pivot || {};
//   }

//   // You can add additional methods related to amenities here
// }
