// src/components/SkeletonTruckCard.jsx
import React from "react";

export default function SkeletonTruckCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-50 p-3 rounded-xl">
          <div className="w-6 h-6 rounded bg-blue-100 animate-pulse" />
        </div>
        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-52 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-60 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
