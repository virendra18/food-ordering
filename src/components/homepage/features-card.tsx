import React from "react";

interface FeatureCardProps {
  children: React.ReactNode;
  className?: string;
}

const FeaturesCard = ({ className, children }: FeatureCardProps) => {
  return (
    <div
      className={`${className} card flex flex-col items-center border-solid border-4 border-primary px-5 py-2 rounded-xl mt-10`}
    >
      {children}
    </div>
  );
};

export default FeaturesCard;
