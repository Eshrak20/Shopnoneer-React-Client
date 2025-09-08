/* eslint-disable @typescript-eslint/no-explicit-any */
// components/profile/AddressSection.tsx
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddressSectionProps {
  title: string;
  prefix: string;
  isEditing: boolean;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  divisions: any[];
  getDistrictsByDivision: (divisionId: string) => any[];
  getUpazilasByDistrict: (districtId: string) => any[];
}

export const AddressSection = ({
  title,
  prefix,
  isEditing,
  formData,
  //   handleChange,
  handleSelectChange,
  divisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
}: AddressSectionProps) => {
  const divisionId = formData[`${prefix}Division`];
  const districtId = formData[`${prefix}District`];

  const filteredDistricts = divisionId
    ? getDistrictsByDivision(divisionId)
    : [];
  const filteredUpazilas = districtId ? getUpazilasByDistrict(districtId) : [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Division */}
        <div className="space-y-2">
          <Label htmlFor={`${prefix}Division`}>Division</Label>
          {isEditing ? (
            <Select
              value={formData[`${prefix}Division`] || ""}
              onValueChange={(value) =>
                handleSelectChange(`${prefix}Division`, value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
              <SelectContent>
                {divisions.map((division) => (
                  <SelectItem key={division.value} value={division.value}>
                    {division.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-sm py-2 px-3 rounded-md border border-transparent">
              {divisionId
                ? divisions.find((d) => d.value === divisionId)?.label ||
                  "Not provided"
                : "Not provided"}
            </p>
          )}
        </div>

        {/* District */}
        <div className="space-y-2">
          <Label htmlFor={`${prefix}District`}>District</Label>
          {isEditing ? (
            <Select
              value={formData[`${prefix}District`] || ""}
              onValueChange={(value) =>
                handleSelectChange(`${prefix}District`, value)
              }
              disabled={!divisionId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {filteredDistricts.map((district) => (
                  <SelectItem key={district.value} value={district.value}>
                    {district.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-sm py-2 px-3 rounded-md border border-transparent">
              {districtId
                ? filteredDistricts.find((d) => d.value === districtId)
                    ?.label || "Not provided"
                : "Not provided"}
            </p>
          )}
        </div>

        {/* Upazila */}
        <div className="space-y-2">
          <Label htmlFor={`${prefix}Upazila`}>Upazila/Thana</Label>
          {isEditing ? (
            <Select
              value={formData[`${prefix}Upazila`] || ""}
              onValueChange={(value) =>
                handleSelectChange(`${prefix}Upazila`, value)
              }
              disabled={!districtId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select upazila" />
              </SelectTrigger>
              <SelectContent>
                {filteredUpazilas.map((upazila) => (
                  <SelectItem key={upazila.value} value={upazila.value}>
                    {upazila.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-sm py-2 px-3 rounded-md border border-transparent">
              {formData[`${prefix}Upazila`]
                ? filteredUpazilas.find(
                    (u) => u.value === formData[`${prefix}Upazila`]
                  )?.label || "Not provided"
                : "Not provided"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
