"use client";
import { Loader2 } from "lucide-react";
import React from "react";

const PageLoading = ({ size = 36 }: { size?: number }) => {
  return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin" size={size} />
    </div>
  );
};

export default PageLoading;
