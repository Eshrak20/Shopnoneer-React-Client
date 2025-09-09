// SingleProject.tsx

import { useParams } from "react-router-dom";
import { useGetSingleProjectQuery } from "@/redux/api/adminApi";
import DetailsPropMainCard from "./DetailsPropMainCard";
import DetailPropBanner from "./DetailPropBannert";
import SingleProjectSkeleton from "./SingleProjectSkeleton";

const SingleProject = () => {
  const { id } = useParams<{ id: string }>();
  const { data: response, isLoading } = useGetSingleProjectQuery(id!);
  const project = response?.data;

  // Render the skeleton component while loading
  if (isLoading) {
    return <SingleProjectSkeleton />;
  }

  // Handle the case where the project is not found
  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <>
      {project.projectImages && project.projectImages.length > 0 && (
        <DetailPropBanner images={project.projectImages} />
      )}
      <DetailsPropMainCard property={project} />
    </>
  );
};

export default SingleProject;