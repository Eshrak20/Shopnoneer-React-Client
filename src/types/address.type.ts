

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface DDUpazila {
  _id: string;
  name: string;
  nameBn: string;
  code: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface DDUpazila {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: DDUpazila[];
}



export interface Facility {
  _id: string;
  name: string;
}


export interface Housing {
  _id: string;
  name: string;
  nameBn: string;
  upazila: DDUpazila;
  district: DDUpazila;
  division: DDUpazila;
  latitude: number;
  longitude: number;
  location: string;
  createdAt: string;
  updatedAt: string;
  facilities: Facility[];
}


export interface AllHousing {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: Housing[];
}