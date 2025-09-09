interface Auth {
  provider: string;
  providerId: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  auths: Auth[];
  is_active: "ACTIVE" | "INACTIVE";
  role: "USER" | "ADMIN" | string;
  is_verified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
export type GetAllUserParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  email?: string;
  phone?: string;
};
export interface UsersResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: User[];
}
export interface Division {
  _id: string;
  name: string;
  nameBn: string;
  code: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
}



interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}


export interface UpdateUserRoleApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: User;
}
export interface Amenity {
  _id: string;
  name: string;
  nameBn: string;
  iconWeb: string;
  iconAndroid?: string;
  iconIos?: string;
}
export interface LocationRef {
  _id: string;
  name: string;
  nameBn: string;
  latitude?: string;
  longitude?: string;
}

export interface Project {
  _id: string;
  name: string;
  nameBn: string;
  division: LocationRef | null;
  district: LocationRef | null;
  upazila: LocationRef | null;
  housing: LocationRef | null;
  road?: string;
  block?: string;
  plotNumber?: string;
  plotSize?: number;
  plotFace?: string;
  storied?: number;
  noOfUnits?: number;
  noOfBeds?: number;
  noOfBaths?: number;
  noOfBalcony?: number;
  floorArea?: number;
  floorNo?: number;
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  totalPrice: number;
  ratePerSqr: number;
  isCorner?: boolean;
  parkingAvailable?: boolean;
  description: string;
  address: string;
  projectImages: string[];
  amenities: Amenity[];
  createdAt: string;
  updatedAt: string;
}


export interface ProjectMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ProjectsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: ProjectMeta;
  data: Project[];
}
export interface SingleProjectResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Project; // not Project[]
}