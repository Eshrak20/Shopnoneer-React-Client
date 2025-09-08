// src/utils/profilePhoto.ts

/**
 * Prepares FormData for uploading a profile photo
 * @param file - The image file selected by the user
 * @param fieldName - Backend expected field name (default = "profileImage")
 */
export const prepareProfilePhotoFormData = (file: File, fieldName = "profileImage"): FormData => {
  const formData = new FormData();
  formData.append(fieldName, file);
  return formData;
};
