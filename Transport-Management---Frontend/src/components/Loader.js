// src/components/Loader.jsx
import React from "react";

export default function Loader({ text = "" }) {
  return (
    <div className="flex items-center gap-3 text-gray-600">
      <span className="inline-block h-5 w-5 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
      <span className="text-sm">{text}</span>
    </div>
  );
}
