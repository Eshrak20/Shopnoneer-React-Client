/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FilterSectionProps {
  filters: any;
  setFilters: (filters: any) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  setFilters,
}) => {
  const handleSelectChange = (name: string, value: string) => {
    // If the value is 'all', set the filter to an empty string to clear it
    const newFilters = {
      ...filters,
      [name]: value === "all" ? "" : value,
    };
    setFilters(newFilters);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Filters</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="search" className="mb-2 block">
            Search
          </Label>
          <Input
            id="search"
            type="text"
            name="search"
            placeholder="Search by name, road..."
            value={filters.search || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* Beds Dropdown */}
        <div>
          <Label htmlFor="beds" className="mb-2 block">
            Beds
          </Label>
          <Select
            value={filters.beds || "all"}
            onValueChange={(value) => handleSelectChange("beds", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Beds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select Beds</SelectItem>
              <SelectItem value="1">1 Bed</SelectItem>
              <SelectItem value="2">2 Beds</SelectItem>
              <SelectItem value="3">3 Beds</SelectItem>
              <SelectItem value="4">4 Beds</SelectItem>
              <SelectItem value="5">5 Beds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Baths Dropdown */}
        <div>
          <Label htmlFor="baths" className="mb-2 block">
            Baths
          </Label>
          <Select
            value={filters.baths || "all"}
            onValueChange={(value) => handleSelectChange("baths", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Baths" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select Baths</SelectItem>
              <SelectItem value="1">1 Bath</SelectItem>
              <SelectItem value="2">2 Baths</SelectItem>
              <SelectItem value="3">3 Baths</SelectItem>
              <SelectItem value="4">4 Baths</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Balcony Dropdown */}
        <div>
          <Label htmlFor="balcony" className="mb-2 block">
            Balcony
          </Label>
          <Select
            value={filters.balcony || "all"}
            onValueChange={(value) => handleSelectChange("balcony", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Balcony" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select Balcony</SelectItem>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Dropdown */}
        <div>
          <Label htmlFor="priceRange" className="mb-2 block">
            Price Range
          </Label>
          <Select
            value={filters.priceRange || "all"}
            onValueChange={(value) => handleSelectChange("priceRange", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select Price</SelectItem>
              <SelectItem value="3000000-4000000">30L - 40L</SelectItem>
              <SelectItem value="4000000-5000000">40L - 50L</SelectItem>
              <SelectItem value="6000000-7000000">60L - 70L</SelectItem>
              <SelectItem value="8000000-9000000">80L - 90L</SelectItem>
              <SelectItem value="9000000-10000000">90L - 100L</SelectItem>
              <SelectItem value="10000000-20000000">100L - 200L</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sqft Dropdown */}
        <div>
          <Label htmlFor="sqrftRange" className="mb-2 block">
            Area (sqft)
          </Label>
          <Select
            value={filters.sqrftRange || "all"}
            onValueChange={(value) => handleSelectChange("sqrftRange", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Area (sqft)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select Area</SelectItem>
              <SelectItem value="500-1000">500 - 1000 sqft</SelectItem>
              <SelectItem value="1000-1500">1000 - 1500 sqft</SelectItem>
              <SelectItem value="1500-2000">1500 - 2000 sqft</SelectItem>
              <SelectItem value="2000-2500">2000 - 2500 sqft</SelectItem>
              <SelectItem value="2500-3000">2500 - 3000 sqft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Created Date */}
        <div>
          <Label htmlFor="createdAt" className="mb-2 block">
            Created Date
          </Label>
          <Input
            id="createdAt"
            type="date"
            name="createdAt"
            value={filters.createdAt || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
