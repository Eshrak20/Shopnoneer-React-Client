import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBath,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import type { Project } from "@/types/admin.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DetailCardProps {
  sortedProjects: Project[];
  isLoading: boolean;
}

const DetailCard: React.FC<DetailCardProps> = ({
  sortedProjects,
  isLoading,
}) => {
  const navigate = useNavigate();

  // Skeleton Loading State
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-4 mt-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!sortedProjects || sortedProjects.length === 0)
    return (
      <p className="text-muted-foreground text-center py-8">
        No projects found. Try adjusting your filters. 😔
      </p>
    );

  const handleClick = (id: string) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedProjects.map((project) => (
        <Card
          key={project._id}
          className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
          onClick={() => handleClick(project._id)}
        >
          <img
            src={project.projectImages[0] || "/assets/no-image.png"}
            alt={project.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <CardHeader>
            <CardTitle className="text-lg font-semibold truncate">
              {project.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground truncate">
              {project.road}, {project.housing?.nameBn}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faBed} className="text-primary" />
                {project.noOfBeds} Beds
              </div>
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faBath} className="text-primary" />
                {project.noOfBaths} Baths
              </div>
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faHome} className="text-primary" />
                {project.floorArea} sqft
              </div>
            </div>
            <p className="mt-2 font-semibold text-card-foreground text-lg">
              Price: ৳{project.totalPrice.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DetailCard;