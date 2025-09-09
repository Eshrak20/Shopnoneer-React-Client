import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectImageUploader from "@/components/ProjectImageUploader";
import { useCreateProjectMutation } from "@/redux/api/adminApi";

// Define TypeScript interfaces
interface ProjectFormData {
  name: string;
  nameBn: string;
  division: string;
  district: string;
  upazila: string;
  housing: string;
  road: string;
  block: string;
  plotNumber: string;
  plotSize: string;
  plotFace: string;
  storied: string;
  noOfUnits: string;
  noOfBeds: string;
  noOfBaths: string;
  noOfBalcony: string;
  floorArea: string;
  floorNo: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  totalPrice: string;
  ratePerSqr: string;
  isCorner: boolean;
  parkingAvailable: boolean;
  description: string;
}

interface ProjectImageFile {
  id: string;
  file: File;
  preview: string;
}

const CreateProject = () => {
  const [createProject] = useCreateProjectMutation();

  const [form, setForm] = useState<ProjectFormData>({
    name: "",
    nameBn: "",
    division: "",
    district: "",
    upazila: "",
    housing: "",
    road: "",
    block: "",
    plotNumber: "",
    plotSize: "",
    plotFace: "",
    storied: "",
    noOfUnits: "",
    noOfBeds: "",
    noOfBaths: "",
    noOfBalcony: "",
    floorArea: "",
    floorNo: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    totalPrice: "",
    ratePerSqr: "",
    isCorner: false,
    parkingAvailable: false,
    description: "",
  });

  const [images, setImages] = useState<ProjectImageFile[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      const value = form[key as keyof ProjectFormData];
      formData.append(key, value.toString());
    });

    images.forEach((file) => {
      formData.append("projectImages", file.file);
    });

    try {
      const res = await createProject(formData).unwrap();
      alert(res.message || "Project created successfully!");
      setForm({
        name: "",
        nameBn: "",
        division: "",
        district: "",
        upazila: "",
        housing: "",
        road: "",
        block: "",
        plotNumber: "",
        plotSize: "",
        plotFace: "",
        storied: "",
        noOfUnits: "",
        noOfBeds: "",
        noOfBaths: "",
        noOfBalcony: "",
        floorArea: "",
        floorNo: "",
        ownerName: "",
        ownerPhone: "",
        ownerEmail: "",
        totalPrice: "",
        ratePerSqr: "",
        isCorner: false,
        parkingAvailable: false,
        description: "",
      });
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  return (
    <div className=" p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Project Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Project Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nameBn">Project Name (Bangla)</Label>
                  <Input
                    id="nameBn"
                    name="nameBn"
                    placeholder="Project Name (Bangla)"
                    value={form.nameBn}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Location Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="division">Division ID</Label>
                  <Input
                    id="division"
                    name="division"
                    placeholder="Division ID"
                    value={form.division}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="district">District ID</Label>
                  <Input
                    id="district"
                    name="district"
                    placeholder="District ID"
                    value={form.district}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="upazila">Upazila ID</Label>
                  <Input
                    id="upazila"
                    name="upazila"
                    placeholder="Upazila ID"
                    value={form.upazila}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="housing">Housing ID</Label>
                  <Input
                    id="housing"
                    name="housing"
                    placeholder="Housing ID"
                    value={form.housing}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Plot Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Plot Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="road">Road</Label>
                  <Input
                    id="road"
                    name="road"
                    placeholder="Road"
                    value={form.road}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="block">Block</Label>
                  <Input
                    id="block"
                    name="block"
                    placeholder="Block"
                    value={form.block}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="plotNumber">Plot Number</Label>
                  <Input
                    id="plotNumber"
                    name="plotNumber"
                    placeholder="Plot Number"
                    value={form.plotNumber}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="plotSize">Plot Size</Label>
                  <Input
                    id="plotSize"
                    name="plotSize"
                    type="number"
                    placeholder="Plot Size"
                    value={form.plotSize}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="plotFace">Plot Face</Label>
                  <Input
                    id="plotFace"
                    name="plotFace"
                    placeholder="Plot Face"
                    value={form.plotFace}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storied">Storied</Label>
                  <Input
                    id="storied"
                    name="storied"
                    type="number"
                    placeholder="Storied"
                    value={form.storied}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Unit Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Unit Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="noOfUnits">No of Units</Label>
                  <Input
                    id="noOfUnits"
                    name="noOfUnits"
                    type="number"
                    placeholder="No of Units"
                    value={form.noOfUnits}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="noOfBeds">No of Beds</Label>
                  <Input
                    id="noOfBeds"
                    name="noOfBeds"
                    type="number"
                    placeholder="No of Beds"
                    value={form.noOfBeds}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="noOfBaths">No of Baths</Label>
                  <Input
                    id="noOfBaths"
                    name="noOfBaths"
                    type="number"
                    placeholder="No of Baths"
                    value={form.noOfBaths}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="noOfBalcony">No of Balcony</Label>
                  <Input
                    id="noOfBalcony"
                    name="noOfBalcony"
                    type="number"
                    placeholder="No of Balcony"
                    value={form.noOfBalcony}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="floorArea">Floor Area</Label>
                  <Input
                    id="floorArea"
                    name="floorArea"
                    type="number"
                    placeholder="Floor Area"
                    value={form.floorArea}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="floorNo">Floor No</Label>
                  <Input
                    id="floorNo"
                    name="floorNo"
                    type="number"
                    placeholder="Floor No"
                    value={form.floorNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Owner Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Owner Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    placeholder="Owner Name"
                    value={form.ownerName}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerPhone">Owner Phone</Label>
                  <Input
                    id="ownerPhone"
                    name="ownerPhone"
                    placeholder="Owner Phone"
                    value={form.ownerPhone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerEmail">Owner Email</Label>
                  <Input
                    id="ownerEmail"
                    name="ownerEmail"
                    type="email"
                    placeholder="Owner Email"
                    value={form.ownerEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalPrice">Total Price</Label>
                  <Input
                    id="totalPrice"
                    name="totalPrice"
                    type="number"
                    placeholder="Total Price"
                    value={form.totalPrice}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ratePerSqr">Rate Per Sqr</Label>
                  <Input
                    id="ratePerSqr"
                    name="ratePerSqr"
                    type="number"
                    placeholder="Rate Per Sqr"
                    value={form.ratePerSqr}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Features</h3>
              <div className="flex gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isCorner"
                    name="isCorner"
                    checked={form.isCorner}
                    onCheckedChange={(checked) => 
                      setForm(prev => ({ ...prev, isCorner: checked as boolean }))
                    }
                  />
                  <Label htmlFor="isCorner">Is Corner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parkingAvailable"
                    name="parkingAvailable"
                    checked={form.parkingAvailable}
                    onCheckedChange={(checked) => 
                      setForm(prev => ({ ...prev, parkingAvailable: checked as boolean }))
                    }
                  />
                  <Label htmlFor="parkingAvailable">Parking Available</Label>
                </div>
              </div>
            </div>

            {/* Image Uploader */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Project Images</h3>
              <ProjectImageUploader files={images} setFiles={setImages} />
            </div>

            <Button type="submit" className="w-full">Create Project</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProject;