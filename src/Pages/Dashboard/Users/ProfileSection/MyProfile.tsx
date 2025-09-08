/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/userApi";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Save, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/handleApiError";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfileData } from "./useProfileData";
import { InputField } from "./InputField";
import { Label } from "@/components/ui/label";
import { AddressSection } from "./AddressSection";

const MyProfile = () => {
  const { data: profileData, isLoading, isError } = useGetMyProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
  const {
    divisions,
    houseTypes,
    getDistrictsByDivision,
    getUpazilasByDistrict
  } = useProfileData();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Load profile data
  useEffect(() => {
    if (profileData?.data?.data) {
      setFormData(profileData.data.data);
    }
  }, [profileData]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <Card className="m-6">
        <CardContent className="pt-6">
          <p className="text-destructive text-center">
            Failed to load profile. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  const user = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const editableFields = [
        "name", "phone", "shortBio", "education", "occupation", "age",
        "presentDivision", "presentDistrict", "presentUpazila",
        "permanentDivision", "permanentDistrict", "permanentUpazila",
        "estimatedBudget", "currentCapital", "familyMembers",
        "monthlyIncome", "preferredFlatSize", "preferredHouseType"
      ];

      const updatePayload: Record<string, any> = {};
      editableFields.forEach((field) => {
        if (formData[field] !== undefined) {
          updatePayload[field] = formData[field];
        }
      });

      await updateProfile(updatePayload).unwrap();
      toast.success("Profile updated successfully ✅");
      setIsEditing(false);
    } catch (error: any) {
      handleApiError(error);
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle>My Profile</CardTitle>
            <CardDescription>
              Manage your personal information and preferences
            </CardDescription>
          </div>
          {!isEditing && user?.role !== "ADMIN" && (
            <Button onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.profilePhoto || ""} alt={user?.name} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {user?.role}
                </span>
                {user?.isVerified && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Full Name"
                name="name"
                isEditing={isEditing && user?.role !== "ADMIN"}
                value={user?.name}
                onChange={handleChange}
              />

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <p className="text-sm py-2 px-3 rounded-md border border-transparent">
                  {user?.email}
                </p>
              </div>

              <InputField
                label="Phone Number"
                name="phone"
                isEditing={isEditing && user?.role !== "ADMIN"}
                value={user?.phone}
                onChange={handleChange}
              />

              <div className="space-y-2">
                <Label htmlFor="role">Account Role</Label>
                <p className="text-sm py-2 px-3 rounded-md border border-transparent">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Additional fields for normal users */}
          {user?.role !== "ADMIN" && (
            <>
              <Separator />
              
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    label="Age"
                    name="age"
                    type="number"
                    isEditing={isEditing}
                    value={user?.age}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Occupation"
                    name="occupation"
                    isEditing={isEditing}
                    value={user?.occupation}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Education"
                    name="education"
                    isEditing={isEditing}
                    value={user?.education}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Family Members"
                    name="familyMembers"
                    type="number"
                    isEditing={isEditing}
                    value={user?.familyMembers}
                    onChange={handleChange}
                  />

                  <div className="md:col-span-2">
                    <InputField
                      label="Short Bio"
                      name="shortBio"
                      isEditing={isEditing}
                      value={user?.shortBio}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <Separator />
              
              {/* Present Address */}
              <AddressSection
                title="Present Address"
                prefix="present"
                isEditing={isEditing}
                formData={formData}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                divisions={divisions}
                getDistrictsByDivision={getDistrictsByDivision}
                getUpazilasByDistrict={getUpazilasByDistrict}
              />

              <Separator />
              
              {/* Permanent Address */}
              <AddressSection
                title="Permanent Address"
                prefix="permanent"
                isEditing={isEditing}
                formData={formData}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                divisions={divisions}
                getDistrictsByDivision={getDistrictsByDivision}
                getUpazilasByDistrict={getUpazilasByDistrict}
              />

              <Separator />
              
              {/* Housing Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Housing Preferences</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Preferred House Type */}
                  <div className="space-y-2">
                    <Label htmlFor="preferredHouseType">Preferred House Type</Label>
                    {isEditing ? (
                      <Select
                        value={user?.preferredHouseType || ""}
                        onValueChange={(value) => handleSelectChange("preferredHouseType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select house type" />
                        </SelectTrigger>
                        <SelectContent>
                          {houseTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm py-2 px-3 rounded-md border border-transparent">
                        {houseTypes.find(t => t.value === user?.preferredHouseType)?.label || "Not provided"}
                      </p>
                    )}
                  </div>

                  <InputField
                    label="Preferred Flat Size (sq ft)"
                    name="preferredFlatSize"
                    type="number"
                    isEditing={isEditing}
                    value={user?.preferredFlatSize}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Estimated Budget (BDT)"
                    name="estimatedBudget"
                    type="number"
                    isEditing={isEditing}
                    value={user?.estimatedBudget}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Current Capital (BDT)"
                    name="currentCapital"
                    type="number"
                    isEditing={isEditing}
                    value={user?.currentCapital}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Monthly Income (BDT)"
                    name="monthlyIncome"
                    type="number"
                    isEditing={isEditing}
                    value={user?.monthlyIncome}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {/* Save / Cancel buttons */}
          {isEditing && user?.role !== "ADMIN" && (
            <div className="flex gap-4 pt-4">
              <Button onClick={handleUpdate} disabled={isUpdating}>
                {isUpdating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isUpdating}
              >
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Skeleton component for loading state
const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Separator />
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;