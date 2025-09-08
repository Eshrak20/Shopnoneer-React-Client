/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useProfileData.ts

import { useGetAllDistrictQuery, useGetAllDivisionQuery, useGetAllHousingQuery, useGetAllUpazilaQuery } from "@/redux/api/addressApi";


export const useProfileData = () => {
  const { data: divisionsData } = useGetAllDivisionQuery();
  const { data: districtsData } = useGetAllDistrictQuery();
  const { data: upazilaData } = useGetAllUpazilaQuery();
  const { data: housingData } = useGetAllHousingQuery();

  // Transform data for easier use in components
  const divisions = divisionsData?.data?.map((div: any) => ({
    value: div._id,
    label: div.name
  })) || [];
  const districts = districtsData?.data?.map((dist: any) => ({
    value: dist._id,
    label: dist.name,
    divisionId: dist.division
  })) || [];

  const upazilas = upazilaData?.data?.map((upz: any) => ({
    value: upz._id,
    label: upz.name,
    districtId: upz.district
  })) || [];

  const houseTypes = housingData?.data?.map((house: any) => ({
    value: house._id,
    label: house.name
  })) || [];
console.log(houseTypes)

  // Helper functions to filter by parent ID
  const getDistrictsByDivision = (divisionId: string) => 
    districts.filter(dist => dist.divisionId === divisionId);
  
  const getUpazilasByDistrict = (districtId: string) => 
    upazilas.filter(upz => upz.districtId === districtId);

  return {
    divisions,
    districts,
    upazilas,
    houseTypes,
    getDistrictsByDivision,
    getUpazilasByDistrict
  };
};