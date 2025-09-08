export interface Auth {
  provider: string;
  providerId: string;
}

export interface User {
  // Required for all users (common fields)
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  isActive?: string;
  isVerified?: boolean;
  profilePhoto?: string;
  auths?: Auth[];
  createdAt?: string | number | Date;
  updatedAt?: string | number | Date;

  // Optional fields specific to normal users
  shortBio?: string;
  education?: string;
  occupation?: string;
  age?: number;
  presentDivision?: string;
  presentDistrict?: string;
  presentUpazila?: string;
  permanentDivision?: string;
  permanentDistrict?: string;
  permanentUpazila?: string;
  estimatedBudget?: number;
  currentCapital?: number;
  familyMembers?: number;
  monthlyIncome?: number;
  preferredFlatSize?: number;
  preferredHouseType?: string;
}

export interface ProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: User;
  };
}
