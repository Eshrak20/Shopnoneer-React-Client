// SingleProjectSkeleton.tsx

import React from "react";

const Skeleton = () => (
  <div className="bg-gray-200 animate-pulse rounded-md" />
);

const SingleProjectSkeleton = () => {
  return (
    <div className="py-10 md:px-4 sm:px-6 lg:px-0 mx-auto">
      {/* Banner Skeleton */}
      <div className="w-full h-[250px] md:h-[400px] 2xl:h-[750px] bg-gray-200 animate-pulse rounded-md mb-8" />

      <div className="bg-white rounded-xl overflow-hidden">
        <section className="grid grid-cols-1 lg:grid-cols-3 p-0">
          {/* Left Column: Property Details Skeleton */}
          <div className="lg:col-span-2 space-y-6 py-6 px-4">
            {/* Title Skeleton */}
            <Skeleton />
            <div className="h-10 w-3/4" />

            {/* Address Skeleton */}
            <div className="flex items-center space-x-3 mb-4">
              <Skeleton />
              <div className="h-6 w-1/4" />
              <div className="h-6 w-1/2" />
            </div>

            {/* Price and Contact Skeleton */}
            <div className="bg-gray-100 p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-grow">
                <div className="h-8 w-1/2 mb-2 bg-gray-200 animate-pulse rounded-md" />
                <div className="h-6 w-1/3 bg-gray-200 animate-pulse rounded-md" />
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-28 bg-gray-200 animate-pulse rounded-md" />
                <div className="h-10 w-28 bg-gray-200 animate-pulse rounded-md" />
              </div>
            </div>

            {/* Quick Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-12 bg-gray-200 animate-pulse rounded-md" />
                  <div className="h-4 w-20 bg-gray-200 animate-pulse rounded-md" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-12 bg-gray-200 animate-pulse rounded-md" />
                  <div className="h-4 w-20 bg-gray-200 animate-pulse rounded-md" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-12 bg-gray-200 animate-pulse rounded-md" />
                  <div className="h-4 w-20 bg-gray-200 animate-pulse rounded-md" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-12 bg-gray-200 animate-pulse rounded-md" />
                  <div className="h-4 w-20 bg-gray-200 animate-pulse rounded-md" />
                </div>
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-4">
              <div className="h-8 w-1/4 bg-gray-200 animate-pulse rounded-md" />
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md" />
              <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded-md" />
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md" />
            </div>

            {/* Property Details Skeleton */}
            <div className="bg-gray-100 rounded-xl shadow-sm p-6">
              <div className="h-8 w-1/3 mb-4 bg-gray-200 animate-pulse rounded-md" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-full" />
                    <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Map Skeleton */}
          <div className="p-6 space-y-6">
            <div className="bg-gray-100 rounded-xl border border-gray-200 overflow-hidden shadow-lg transition-all hover:shadow-xl h-[400px] lg:h-full">
              <div className="px-6 pt-5 pb-3 border-b border-gray-100">
                <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded-md" />
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md mt-2" />
              </div>
              <div className="relative h-[calc(100%-85px)] w-full bg-gray-300 animate-pulse" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleProjectSkeleton;