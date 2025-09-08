import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { FaPlus, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";

const ProfilePic = ({ fullName, getInitials, handleInputChange, profilePhoto }) => {
  const [imageToCrop, setImageToCrop] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);



  const [previewUrl, setPreviewUrl] = useState('');
  
  const base64ToFile = (base64, filename = "convertPhoto") => {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const binary = atob(arr[1]);
    let length = binary.length;
    const uArray = new Uint8Array(length);
  
    while (length--) {
      uArray[length] = binary.charCodeAt(length);
    }
  
    return new File([uArray], filename, { type: mime });
  };

  // Add base URL for the backend images if needed
  const getProfilePhotoUrl = (photoPath) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return `${apiUrl}/storage/${photoPath}`; // Replace with actual URL
  };

  // Handle profile photo upload
  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3000 * 1024) {
        Swal.fire({
          icon: "error",
          title: "প্রোফাইল ছবি ৩ মেগাবাইটের বেশি হতে পারবে না।",
          text: "প্রোফাইল ছবি আপলোড সীমাবদ্ধতা!",
          confirmButtonText: "ঠিক আছে",
          confirmButtonColor: "#38b2ac",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result); // Set image to crop
        setCropping(true); // Start cropping process
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle crop complete and send the cropped image to the parent
  const handleCropComplete = async () => {
    if (!croppedAreaPixels) {
      console.error("Cropped area pixels are not available.");
      return;
    }

    const croppedImage = await getCroppedImage(imageToCrop, croppedAreaPixels);
    setCroppedImage(croppedImage);
    setCropping(false);

    // Convert Base64 string to a File
    const croppedFile = base64ToFile(croppedImage, "convertPhoto");

    // Send the file back to the parent
    handleInputChange("profilePhoto", croppedFile);
    const url = URL.createObjectURL(croppedFile);
    setPreviewUrl(url);

  };

  // Get cropped image using canvas
  const getCroppedImage = (imageSrc, crop) => {
    return new Promise((resolve, reject) => {
      if (!crop || !crop.width || !crop.height) {
        console.error("Invalid crop dimensions:", crop);
        return reject("Crop dimensions are invalid");
      }

      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );

        resolve(canvas.toDataURL());
      };

      image.onerror = (error) => {
        console.error("Failed to load image:", error);
        reject(error);
      };
    });
  };

  return (
    <div className="relative flex-shrink-0">
      <div className="relative">
        <input
          type="file"
          id="profilePhotoInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleProfilePhotoUpload}
        />
        {cropping ? (
          <div className="crop-container w-56 h-56 border-2 border-teal-500 rounded-lg shadow-lg overflow-hidden">
            <Cropper
              image={imageToCrop} // Image to crop
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, croppedAreaPixels) => {
                setCroppedAreaPixels(croppedAreaPixels); // Store cropped area
              }}
            />
          </div>
        ) : previewUrl || croppedImage || profilePhoto ? (
          <img
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-teal-500 cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg"
            src={previewUrl || croppedImage || getProfilePhotoUrl(profilePhoto)} // Display cropped or backend profile photo
            alt="Profile"
            onClick={() => document.getElementById("profilePhotoInput").click()}
          />
        ) : (
          <div
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-teal-500 flex items-center justify-center bg-teal-50 text-teal-600 text-5xl lg:text-7xl font-bold cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg"
            onClick={() => document.getElementById("profilePhotoInput").click()}
          >
            {fullName ? getInitials(fullName) : null}
          </div>
        )}
        {!cropping && (
          <div
            className="absolute bottom-3 right-7 bg-teal-600 text-white rounded-full p-2 cursor-pointer transform transition-all hover:scale-110 hover:shadow-lg"
            style={{ transform: "translate(50%, 50%)" }}
            onClick={() => document.getElementById("profilePhotoInput").click()}
          >
            <FaPlus size={18} />
          </div>
        )}
      </div>
      {cropping && (
        <div className="flex justify-center mt-6">
        <button
          className="flex items-center gap-2 bg-teal-500 text-white px-8 py-3 rounded-lg shadow-md transform transition-all hover:shadow-xl hover:bg-teal-600"
          onClick={handleCropComplete}
          role="button"
          aria-label="Crop the Image"
        >
         <span>ছবিটি ক্রপ করুন</span>
          <FaSave size={20} />
        </button>
      </div>
      
      )}
    </div>
  );
};

export default ProfilePic;
