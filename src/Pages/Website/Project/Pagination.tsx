import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalProjects: number;
  currentPage?: number;
  pageSize?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalProjects,
  currentPage = 1,
  pageSize = 9,
}) => {
  const totalPages = Math.ceil(totalProjects / pageSize);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2">
      {pageNumbers.map((number) => (
        <Button
          key={number}
          variant={currentPage === number ? "default" : "outline"}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
