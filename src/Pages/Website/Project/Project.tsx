/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllProjectQuery } from "@/redux/api/adminApi";
import FilterSection from "./FilterSection";
import DetailCard from "./DetailCard";
import Pagination from "./Pagination";

const Project = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllProjectQuery({ ...filters, page });

  const sortedProjects = data?.data || [];
  const totalProject = data?.meta?.total || 0;
  console.log(data);
  return (
    <div className="flex flex-col lg:flex-row bg-background min-h-screen pt-20">
      <aside className="w-full lg:w-64 p-4 lg:p-6 lg:border-r border-border bg-card">
        <FilterSection filters={filters} setFilters={setFilters} />
      </aside>
      <main className="flex-1 p-4 lg:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6">
          Explore Projects
        </h1>
        <div className="rounded-lg shadow-md overflow-hidden p-6 bg-card">
          <DetailCard sortedProjects={sortedProjects} isLoading={isLoading} />
        </div>
        <div className="mt-8">
          <Pagination
            onPageChange={setPage}
            totalProjects={totalProject}
            currentPage={page}
          />
        </div>
      </main>
    </div>
  );
};

export default Project;